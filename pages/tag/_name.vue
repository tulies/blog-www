<template>
  <div class="default-page-container">
    <section class="default-page-main">
      <main-breadcrumb
        v-if="breadcrumb.length>0"
        :breadcrumb="breadcrumb"
      />
      <article-list
        :list="list"
        :total="total"
        :page-size="pageSize"
      />
      <div class="article-pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :page-size="pageSize"
          :current-page.sync="pageNum"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
    <aside class="default-page-aside">
      <!-- <aside-nav/> -->
      <aside-article-rec
        title="热门文章"
        :list="$store.state.article.hotrec"
      />
      <!-- <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div> -->
      <aside-article-rec
        title="最新文章"
        :list="$store.state.article.newrec"
        style="margin-top: 15px;"
      />
    </aside>
  </div>
</template>

<script>
import axios from 'axios'
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleList from '@/components/articleList/index.vue'
import { jssdkConfig, updateappmessagesharedata } from '@/util/wx'
export default {
  components: {
    ArticleList,
    MainBreadcrumb,
    AsideArticleRec
  },
  async asyncData (ctx) {
    const { name: tag } = ctx.params
    let state = {
      tag,
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 0,
      breadcrumb: []
    }
    // 获取文章列表
    const { status, data } = await ctx.$axios.get('/api/article/listByTag', {
      params: {
        page: 0,
        size: 10,
        tag
      }
    })
    if (status === 200 && data.code === 0) {
      state = {
        ...state,
        list: data.data.list,
        total: data.data.total,
        pageSize: data.data.size,
        pageNum: data.data.page + 1
      }
    }

    // 获取面包屑导航--- 根据分类节点id获取父亲节点
    const breadcrumb = [
      {
        id: 1,
        name: '标签',
        url: '/tag'
      },
      {
        id: 2,
        name: tag,
        url: ''
      }
    ]
    state = { ...state, breadcrumb }
    return state
  },
  mounted () {
    jssdkConfig().then(res => {
      if (!res) return
      wx.config({
        // debug: true,
        ...res,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone'
        ]
      })
      wx.ready(function () {
        updateappmessagesharedata()
      })
    })
  },
  methods: {
    async handleCurrentChange (val) {
      const self = this

      const { status, data } = await axios.get('/api/article/list', {
        params: {
          page: val - 1,
          size: self.pageSize,
          categoryId: self.id
        }
      })
      if (status === 200 && data.code === 0) {
        self.list = data.data.list
        self.total = data.data.total
        self.pageNum = data.data.page + 1
      }
    }
  },
  middleware: ['hotArticleRec', 'newArticleRec']
}
</script>

<style scoped lang="scss">
.article-pagination {
  padding: 10px 5px;
}
</style>
