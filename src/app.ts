import Koa from 'koa'

import middleware from './middlewares'
import routes from './routes'
import config from "./config";

(async () => {
    const app = new Koa()

    app.use(await middleware())
    app.use(routes())

    const displayColors = config.displayColors
    try {
        console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', 'Connected to mongo')
    } catch (error) {
        console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', error.toString())
    }

    try {
        const port = config.port
        app.listen(port)
        console.info(displayColors ? '\x1b[32m%s\x1b[0m' : '%s', `Listening to http://localhost:${port}`)
    } catch (err) {
        console.error(displayColors ? '\x1b[31m%s\x1b[0m' : '%s', err)
    }
})()
