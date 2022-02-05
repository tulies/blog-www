/* eslint-disable nuxt/no-cjs-in-config */
module.exports = {
  mode: 'universal',
  // 禁用收集信息
  telemetry: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '王嘉炀·个人博客',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。 - 王嘉炀·个人博客',
      },
      { hid: 'itemprop-name', itemprop: 'name', content: '王嘉炀·个人博客' },
      {
        hid: 'itemprop-description',
        itemprop: 'description',
        content:
          '一个有理想的码农的个人博客，专注前沿技术的研究和学习，一直在快乐学习的路上。 - 王嘉炀·个人博客',
      },
      {
        hid: 'itemprop-image',
        itemprop: 'image',
        content: 'http://stc.wangjiayang.cn/blog/logo.jpg',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?4ad4bbdc6358179dcaa8730e908d407a',
      } /* 引入百度统计的js */,
      { src: 'http://res.wx.qq.com/open/js/jweixin-1.4.0.js' } /* 微信js-sdk */,
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['element-ui/lib/theme-chalk/index.css'],
  css: [
    // 'element-ui/lib/theme-chalk/reset.css',
    '@/assets/css/reset.css',
    // 'element-ui/lib/theme-chalk/index.css',
    // 'element-ui/lib/theme-chalk/display.css',
    // '@/assets/element-#0375F4/index.css',
    // '@/assets/element-#0375F4/display.css',
    '@/assets/element/index.css',
    '@/assets/element/display.css',
    '@/assets/css/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ['@/plugins/element-ui'],
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/baiduGa.js', ssr: false } /* 百度统计 */,
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://localhost:2000',
    // port: '3000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
}
