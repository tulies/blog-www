<template>
<el-container class="default-page-container">
  <el-main class="default-page-main">
    <main-breadcrumb :breadcrumb="breadcrumb" v-if="breadcrumb.length>0"/>
    <article-list :list="list" :total="total" :pageSize="pageSize"/>
     <div class="article-pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </el-main>
  <el-aside class="default-page-aside">
    <!-- <aside-nav/> -->
    <aside-article-rec
      title="热门文章"
      :list="$store.state.article.hotrec"/>
    <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div>
    <aside-article-rec
      title="最新文章"
      :list="$store.state.article.newrec"
      style="margin-top: 15px;"/>
  </el-aside>
</el-container>
</template>

<script>
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleList from '@/components/articleList/index.vue'
export default {
  components: {
    ArticleList,
    MainBreadcrumb,
    AsideNav,
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
    const { status, data } = await ctx.$axios.get(`/api/article/listByTag`, {
      params: {
        page: 0,
        size: 10,
        tag
      }
    })
    if (status === 200 && data.code === 0) {
      state = { ...state,
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
        url: `/tag`
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
  methods: {
    async handleCurrentChange (val) {
      const self = this

      const { status, data } = await self.$axios.get(`/api/article/list`, {
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

