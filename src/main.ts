import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes,
  },
  async (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    if (import.meta.env.SSR) {
      await Promise.all(
        Object.values(import.meta.glob<{ install: UserModule }>('./modules/server/*.ts'))
          .map(async (i) => {
            const mod = await i()
            return mod.install?.(ctx)
          }))
    }

    ctx.app.use(Previewer)
  },
)
