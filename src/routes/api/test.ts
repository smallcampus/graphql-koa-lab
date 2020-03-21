import { Context } from 'koa'
import * as Router from 'koa-router'

export default (router: Router) => {
  router
    .get('/test/auth', (ctx: Context) => {
      ctx.body = `Welcome ${ctx.state.user.username}!`
    })
    .get('/test/error', async () => {
      throw Error('Error handling works!')
    })
    .get('/test/301', (ctx: Context) => {
      ctx.status = 301
    })
}
