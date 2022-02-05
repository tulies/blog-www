<template>
  <!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
  <div class="default-page-container">
    <section class="default-page-main">
      <main-breadcrumb v-if="breadcrumb.length > 0" :breadcrumb="breadcrumb" />
      <article-list :list="list" :total="total" :page-size="pageSize" />
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
      <aside-article-rec title="热门文章" :list="$store.state.article.hotrec" />
      <!-- <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div> -->
      <aside-article-rec
        title="最新文章"
        :list="$store.state.article.newrec"
        style="margin-top: 15px"
      />
    </aside>
  </div>
  <!-- </div> -->
</template>

<script>
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
// import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleList from '@/components/articleList/index.vue'
import { jssdkConfig, updateappmessagesharedata } from '@/util/wx'

export default {
  components: {
    ArticleList,
    MainBreadcrumb,
    // AsideNav,
    AsideArticleRec,
  },
  middleware: ['hotArticleRec', 'plArticleRec'],
  async asyncData(ctx) {
    const { id } = ctx.query
    let state = {
      id,
      list: [],
      total: 0,
      pageSize: 16,
      pageNum: 0,
      breadcrumb: [],
    }
    // 获取文章列表
    const { status, data } = await ctx.$axios.get('/api/article/list', {
      params: {
        page: 0,
        size: 1,
        categoryId: id,
      },
    })
    if (status === 200 && data.code === 0) {
      state = {
        ...state,
        list: data.data.list,
        total: data.data.total,
        pageSize: data.data.size,
        pageNum: data.data.page + 1,
      }
    }

    // 获取面包屑导航--- 根据分类节点id获取父亲节点
    const { status: status2, data: data2 } = await ctx.$axios.get(
      `/api/article/categoryUp/${id}`
    )
    const breadcrumb = []
    if (status2 === 200 && data2.code === 0) {
      breadcrumb.push({
        id: data2.data.id,
        name: data2.data.name,
        url: `/cate?id=${data2.data.id}`,
      })
      // 因为我们最多分2层，所以我这里就简单点写了。
      if (data2.data.parent) {
        if (data2.data.parent.id !== 1) {
          breadcrumb.unshift({
            id: data2.data.parent.id,
            name: data2.data.parent.name,
            url: `/cate?id=${data2.data.parent.id}`,
          })
        }
      }
      state = { ...state, breadcrumb }
    }
    return state
  },
  mounted() {
    jssdkConfig().then((res) => {
      if (!res) return
      wx.config({
        // debug: true,
        ...res,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
        ],
      })
      wx.ready(function () {
        updateappmessagesharedata()
      })
    })
  },
  methods: {
    async handleCurrentChange(val) {
      const self = this

      const { status, data } = await self.$axios.get('/api/article/list', {
        params: {
          page: val - 1,
          size: self.pageSize,
          categoryId: self.id,
        },
      })
      if (status === 200 && data.code === 0) {
        self.list = data.data.list
        self.total = data.data.total
        self.pageNum = data.data.page + 1
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/config.scss';

.main-container {
  max-width: $maxWeight;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .page-main {
    padding: 0;
    // .page-aside
    // width 240px
    .article-pagination {
      padding: 10px 5px;
    }
  }
}
</style>
