import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void
export type UserModuleAsync = (ctx: ViteSSGContext) => Promise<void>
