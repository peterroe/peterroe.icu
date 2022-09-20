import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import './styles/container.css'
import 'tributejs/dist/tribute.css'
import 'uno.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import type { RouterScrollBehavior } from 'vue-router'
import dayjs from 'dayjs'
import vilt from 'vue-img-lazy-tiny'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import App from './App.vue'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: any
  }
}

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient, app }) => {
    dayjs.extend(LocalizedFormat)
    app.use(vilt)
    if (isClient) {
      router.beforeEach(() => { NProgress.start() })
      router.afterEach(() => { NProgress.done() })
    }
  },
)
