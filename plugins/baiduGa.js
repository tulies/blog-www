export default ({ app: { router }, store }) => {
  /* 每次路由变更时进行pv统计 */
  router.afterEach((to, from) => {
    /* 告诉增加一个PV */
    try {
      // 我是ssr，不需要这个。不然会重复上报2次
      // window._hmt = window._hmt || []
      // window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {
    }
  })
}
