import { MongoClient } from 'mongodb'
import * as genericPool from 'generic-pool'
import config from '../config'
import { Context, Next } from 'koa'

const dbUrl = config.mongo.dbUrl
const dbName = config.mongo.dbName

export default () =>
  mongo({
    uri: dbUrl,
    db: dbName,
  })

interface mongoDBOptionsConfig {
  host?: string
  port?: number
  db?: string
  authSource?: string
  max?: number
  min?: number
  acquireTimeoutMillis?: number
  uri?: string
  url?: string
  user?: string
  pass?: string
}

const defaultOptions: mongoDBOptionsConfig = {
  host: 'localhost',
  port: 27017,
  db: dbName,
  authSource: 'admin',
  max: 100,
  min: 1,
  acquireTimeoutMillis: 100,
}

function mongo(options: mongoDBOptionsConfig) {
  options = Object.assign({}, defaultOptions, options)
  let mongoUrl = options.uri ?? options.url ?? ''
  const dbName = options.db
  if (!mongoUrl) {
    if (options.user && options.pass) {
      mongoUrl = `mongodb://${options.user}:${options.pass}@${options.host}:${options.port}/${options.db}?authSource=${options.authSource}`
    } else {
      mongoUrl = `mongodb://${options.host}:${options.port}/${options.db}`
    }
  }

  const mongoPool = genericPool.createPool(
    {
      create: () =>
        MongoClient.connect(mongoUrl, { useNewUrlParser: true, reconnectTries: 1 })
          .then(client => {
            console.debug('Successfully connected to mongo')
            return client
          })
          .catch(err => {
            console.debug('Failed to connect to mongo')
            throw err
          }),
      destroy: client => client.close(),
    },
    options,
  )

  async function acquire() {
    const resource = await mongoPool.acquire()
    console.debug('Acquire one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size)

    return resource
  }

  async function release(resource: MongoClient) {
    if (resource && !resource.isConnected()) {
      await mongoPool.destroy(resource)
    } else {
      await mongoPool.release(resource)
    }
    console.debug('Release one connection (min: %s, max: %s, poolSize: %s)', options.min, options.max, mongoPool.size)
  }

  return async function koaMongo(ctx: Context, next: Next) {
    ctx.mongo = await acquire()
    ctx.db = ctx.mongo.db(dbName)
    try {
      await next()
    } finally {
      await release(ctx.mongo as MongoClient)
    }
  }
}
