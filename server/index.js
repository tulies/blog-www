// import Koa from 'koa'
// import consola from 'consola'
// import { Nuxt, Builder } from 'nuxt'
// import bodyParser from 'koa-bodyparser'
// // import response from './middlewares/response'
// import router from './routes'

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 2000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 使用响应处理中间件
  // app.use(response)

  // 解析请求体
  // app.use(bodyParser())
  app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
  }))
  // 引入路由分发
  app.use(router.routes())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
