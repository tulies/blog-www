<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<el-container class="default-page-container">
  <el-main class="default-page-main">
    <article-detail :article="article"/>
    <div><a href="https://s.click.taobao.com/dolIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-1200-120.jpg" width="100%"/></a></div>
    <article-recomment :list="likes"/>
    <!-- <article-comment/> -->
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
<!-- </div> -->
</template>

<script>
import ArticleDetail from '@/components/article/detail.vue'
import ArticleRecomment from '@/components/article/recomment.vue'
import ArticleComment from '@/components/article/comment.vue'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'

export default {
  components: {
    ArticleDetail,
    ArticleRecomment,
    ArticleComment,
    AsideNav,
    AsideArticleRec
  },
  async asyncData (ctx) {
    const { id } = ctx.params
    let state = {
      article: {},
      likes: []
    }
    // 查询文章详情
    const { status, data } = await ctx.$axios.get(`/api/article/info/${id}`)
    if (status === 200 && data.code === 0) {
      state = { ...state, article: data.data }
    }
    console.log(state.article.tags)
    // 查询猜你喜欢，根据tag去检索
    const { status: status2, data: data2 } = await ctx.$axios.get(`/api/article/listByTags`, {
      params: {
        tags: state.article.tags,
        page: 0,
        size: 6
      }
    })
    if (status2 === 200 && data2.code === 0) {
      state = { ...state, likes: data2.data.list }
    }

    return state
  },
  middleware: ['hotArticleRec', 'newArticleRec']
}
</script>
