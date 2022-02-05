const Koa = require('koa')
const Redis = require('koa-redis')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const json = require('koa-json')

const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const router = require('./routes')
const passport = require('./utils/passport')

const app = new Koa()

const redis = new Redis({
  host: '127.0.0.1', // 安装好的redis服务器地址
  port: 6379, // 端口
  prefix: 'blog:', // 存诸前缀
  // ttl: 60 * 60 * 23, // 过期时间
  // db: 0
})

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

// Import and Set Nuxt.js options
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // 引入路由分发y
  app.use(router.routes())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
