const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const Redis = require('koa-redis')
const session = require('koa-generic-session')
const json = require('koa-json')
const router = require('./routes')
const stcRouter = require('./routes/stc')

const passport = require('./utils/passport')

const app = new Koa()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 2000
const redis = new Redis({
  host: '127.0.0.1', // 安装好的redis服务器地址
  port: 6379, // 端口
  prefix: 'blog:' // 存诸前缀
  // ttl: 60 * 60 * 23, // 过期时间
  // db: 0
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

app.keys = ['blog', 'keyskeys']
app.proxy = true
// 启用session +redis
app.use(session({ key: 'blog', prefix: 'blog:uid', store: redis }))
app.use(json())

// passport登录
app.use(passport.initialize())
app.use(passport.session())

// 使用响应处理中间件
// app.use(response)

// 解析请求体
app.use(bodyParser())
// app.use(bodyParser({
//   extendTypes: ['json', 'form', 'text'] //
// }))

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 引入路由分发
  app.use(router.routes())
  app.use(stcRouter.routes())

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
