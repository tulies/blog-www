<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<div class="default-page-container">
  <section class="default-page-main">
    <article-detail :article="article"/>
    <div><a href="https://s.click.taobao.com/dolIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-1200-120.jpg" width="100%"/></a></div>
    <article-recomment :list="likes"/>
    <article-comment :comments="comments" :topic="commentTopic"/>
  </section>
  <aside class="default-page-aside">
    <!-- <aside-nav/> -->
    <aside-article-rec
      title="热门文章"
      :list="$store.state.article.hotrec"/>
    <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div>
    <aside-article-rec
      title="最新文章"
      :list="$store.state.article.newrec"
      style="margin-top: 15px;"/>
  </aside>
</div>
<!-- </div> -->
</template>

<script>
import ArticleDetail from '@/components/article/detail.vue'
import ArticleRecomment from '@/components/article/recomment.vue'
import ArticleComment from '@/components/comment/index.vue'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import CreateUrl from '@/util/createUrl'

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
      id,
      article: {},
      likes: [],
      commentTopic: {},
      comments: {}
    }
    // 查询文章详情
    const { status, data } = await ctx.$axios.get(`/api/article/info/${id}`)
    if (status === 200 && data.code === 0) {
      state = { ...state, article: data.data }
    }
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
    // 调用主题创建
    const { status: status4, data: datat4 } = await ctx.$axios.post(`/api/comment/initTopic`, {
      tid: id,
      title: state.article.title,
      url: 'http://www.wangjiayang.cn' + CreateUrl.article(id),
      type: 'article'
    })
    if (status4 === 200 && datat4.code === 0) {
      state.commentTopic = datat4.data
      // 查询评论列表
      const { status: status3, data: data3 } = await ctx.$axios.get(`/api/comment/getReplieds`, {
        params: {
          tid: id,
          page: 0,
          size: 10
        }
      })
      if (status3 === 200 && data3.code === 0) {
        state.comments = data3.data
      }
    }

    return state
  },
  middleware: ['hotArticleRec', 'newArticleRec']
}
</script>
