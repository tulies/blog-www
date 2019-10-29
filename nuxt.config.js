// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '王嘉炀·个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { hid: 'description', name: 'description', content: '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。 - 王嘉炀·个人博客' },
      { hid: 'itemprop-name', itemprop: 'name', content: '王嘉炀·个人博客' },
      { hid: 'itemprop-description', itemprop: 'description', content: '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。 - 王嘉炀·个人博客' },
      { hid: 'itemprop-image', itemprop: 'image', content: 'http://stc.wangjiayang.cn/blog/logo.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?4ad4bbdc6358179dcaa8730e908d407a' }, /* 引入百度统计的js */
      { src: 'http://res.wx.qq.com/open/js/jweixin-1.4.0.js' } /* 微信js-sdk */
    ]

  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/reset.css',
    '@/assets/css/reset.css',
    // 'element-ui/lib/theme-chalk/index.css',
    // 'element-ui/lib/theme-chalk/display.css',
    // '@/assets/element-#0375F4/index.css',
    // '@/assets/element-#0375F4/display.css',
    '@/assets/element/index.css',
    '@/assets/element/display.css',
    '@/assets/css/index.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/baiduGa.js', ssr: false } /* 百度统计 */
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    port: '2000'
    // host: 'www.wangjiayang.cn'
  },

  /*
  ** Build configuration
  */
  build: {
    // extractCSS: true,
    // https://github.com/nuxt/nuxt.js/issues/4885#issuecomment-533015230
    extractCSS: { ignoreOrder: true },
    optimization: {

      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
