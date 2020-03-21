import compose from 'koa-compose'
import Router from 'koa-router'
import { Context } from 'koa'

import test from './api/test'

const children = [
  { routes: test, prefix: '' },
]

export default function routes() {
  const router = new Router()

  router.get('/api', (ctx: Context) => {
    ctx.state.user || ctx.throw(403, 'Access Denial')
    ctx.body = router.stack.map(i => {
      return { path: i.path, methods: i.methods }
    })
  })

  // Nested routers
  children.forEach(child => {
    const nestedRouter = new Router()
    child.routes(nestedRouter)
    router.use(child.prefix, nestedRouter.routes(), nestedRouter.allowedMethods())
  })

  return compose([router.routes(), router.allowedMethods()])
}
