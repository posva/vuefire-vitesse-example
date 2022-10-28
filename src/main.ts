import { ViteSSG } from 'vite-ssg'
import { initializeApp } from 'firebase/app'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    initializeApp({
      apiKey: 'AIzaSyAkUKe36TPWL2eZTshgk-Xl4bY_R5SB97U',
      authDomain: 'vue-fire-store.firebaseapp.com',
      databaseURL: 'https://vue-fire-store.firebaseio.com',
      projectId: 'vue-fire-store',
      storageBucket: 'vue-fire-store.appspot.com',
      messagingSenderId: '998674887640',
      appId: '1:998674887640:web:1e2bb2cc3e5eb2fc3478ad',
      measurementId: 'G-RL4BTWXKJ7',
    })

    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Previewer)
  },
)
