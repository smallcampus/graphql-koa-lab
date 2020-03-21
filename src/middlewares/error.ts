import { Middleware } from 'koa'

export default (): Middleware => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      e.status = e.status || 500
      ctx.status = e.status
      switch (e.status) {
        case 401:
          ctx.body = { error: e.originalError ? e.originalError.message : e.message }
          break
        default:
          console.error(e)
          ctx.body = { stack: (e.stack || '').split('\n') } || { message: e.message }
      }
    }
  }
}
