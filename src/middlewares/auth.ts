import { Middleware } from 'koa'
import jwt from 'koa-jwt'
import config from '../config'

export default (): Middleware => {
  return jwt({
    secret: config.jwt.secret,
    getToken: (ctx: any) => {
      const authorization = ctx.header.authorization
      if (authorization?.startsWith('Bearer ')) {
        return authorization.substring(7)
      } else {
        return null
      }
    }
  }).unless({
    path: [
      /^\/[^/]*\/?$/,
      /test\/(?!auth)/,
      /api\/auth\/login/,
      /oauth\/callback/,
      /rss\//
    ]
  })
}
