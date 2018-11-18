<template>
<el-menu
  :default-active="active"
  class="el-menu-demo"
  mode="horizontal"
  hide-on-click="true"
  @select="handleSelect">
  <el-menu-item v-for="nav in navs" :index="nav.index" :key="nav.index">{{nav.name}}</el-menu-item>
</el-menu>
</template>
<script>
export default {
  porps: {
    activeIndex: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // activeIndex: '0',
      active: '',
      navs: [
        {
          index: '0',
          name: '首页',
          url: '/'
        },
        {
          index: '1',
          name: '技术频道',
          url: '/cate/1'
        },
        {
          index: '2',
          name: '杂记',
          url: '/cate/22'
        },
        {
          index: '3',
          name: '留言板',
          url: '/message'
        },
        {
          index: '4',
          name: '关于',
          url: '/about'
        }
      ]
    }
  },

  methods: {
    handleSelect (index) {
      window.location.href = this.navs[index].url
    }

  },
  // computed: {
  //   active () {
  //     if (this.activeIndex !== undefined) {
  //       return this.activeIndex
  //     }
  //     console.log(this)
  //     // const curnav = this.navs.filter(v => window.location.href.indexOf(v.url) !== -1)
  //     // return curnav[0].index
  //     return '0'
  //   }
  // },
  mounted () {
    // if (!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
    //   this.trigger = 'hover'
    // }
    this.active = this.activeIndex
    if (this.active === undefined) {
      const curnav = this.navs.filter(v => (window.location.href.indexOf(v.url) !== -1 && v.url !== '/') || (window.location.pathname === '/' && v.url === '/'))
      if (curnav && curnav.length > 0) {
        this.active = curnav[0].index
      }
    }
  }

}
</script>
