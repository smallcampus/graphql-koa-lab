import compose from 'koa-compose' // Compose the given middleware and return middleware.
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

import mongo from './mongo'
import handleErrors from './error'
import auth from './auth'
import graphql from './graphql'

export default async function middleware() {
  return compose([
    logger(),
    handleErrors(),
    auth(),
    bodyParser(),
    mongo(),
    await graphql(),
  ])
}
