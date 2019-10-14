<template>

<div class="default-page-container">
  <section class="default-page-main">
    <!-- <cover/> -->
    <main-title-bar
      title="文章推荐"
      :keywords="keywords"
      :mores="mores"
      />
    <article-list :list="articleList"/>

  </section>
  <aside class="default-page-aside">
    <!-- <aside-nav/> -->
    <aside-article-rec
      title="热门文章"
      :list="$store.state.article.hotrec"/>
    <!-- <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div> -->
    <aside-article-rec
      title="最新文章"
      :list="$store.state.article.newrec"
      style="margin-top: 15px;"/>

  </aside>
</div>
</template>

<script>
import Cover from '@/components/index/cover.vue'
import MainTitleBar from '@/components/widgets/mainTitleBar'
import ArticleList from '@/components/articleList/index.vue'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'

export default {
  components: {
    Cover,
    ArticleList,
    MainTitleBar,
    AsideNav,
    AsideArticleRec
  },
  data () {
    return {
      keywords: [{
        name: 'Vue',
        url: '/tag/vue'
      }, {
        name: 'Koa',
        url: '/tag/koa'
      }, {
        name: 'ReactJs',
        url: '/tag/'
      }],
      mores: [{
        name: '查看更多>>',
        url: '/cate/1'
      }]
    }
  },
  async asyncData (ctx) {
    let state = {
      articleList: []
    }
    const { status, data } = await ctx.$axios.get(`/api/article/list`, {
      params: {
        page: 0,
        size: 16,
        categoryId: 1
      }
    })
    if (status === 200 && data.code === 0) {
      state = { ...state, articleList: data.data.list }
    }

    return state
  },
  middleware: ['hotArticleRec', 'newArticleRec']
}
</script>
