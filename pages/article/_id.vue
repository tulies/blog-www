<template>
  <!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
  <div class="default-page-container">
    <section class="default-page-main">
      <article-detail :article="article" @tocinit="tocinit" />
      <!-- <div><a href="https://s.click.taobao.com/dolIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-1200-120.jpg" width="100%"/></a></div> -->
      <article-recomment :list="likes" />
      <article-comment :comments="comments" :topic="commentTopic" />
    </section>
    <aside class="default-page-aside">
      <!-- <aside-nav/> -->
      <article-toc :tocdata="tocdata" />
      <aside-article-rec
        title="热门文章"
        :list="$store.state.article.hotrec"
        style="margin-top: 15px"
      />
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
import ArticleToc from '@/components/article/toc.vue'
import ArticleDetail from '@/components/article/detail.vue'
import ArticleRecomment from '@/components/article/recomment.vue'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleComment from '@/components/comment/index.vue'
import { jssdkConfig, updateappmessagesharedata } from '@/util/wx'

import CreateUrl from '@/util/createUrl'

export default {
  components: {
    ArticleDetail,
    ArticleRecomment,
    ArticleComment,
    AsideArticleRec,
    ArticleToc,
  },
  middleware: ['hotArticleRec', 'newArticleRec'],
  async asyncData(ctx) {
    const { id } = ctx.params
    let state = {
      id,
      article: {},
      likes: [],
      commentTopic: {},
      comments: {},
    }
    // 查询文章详情
    const data = await ctx.$axios.$get(`/api/article/info/${id}`)
    if (data && data.code === 0) {
      state = { ...state, article: data.data }
    }
    // 查询猜你喜欢，根据tag去检索
    const data2 = await ctx.$axios.$get('/api/article/listByTags', {
      params: {
        tags: state.article.tags,
        page: 0,
        size: 6,
      },
    })
    if (data2 && data2.code === 0) {
      state = { ...state, likes: data2.data.list }
    }
    // 调用主题创建
    const datat4 = await ctx.$axios.$post('/api/comment/initTopic', {
      tid: id,
      title: state.article.title,
      url: 'http://www.wangjiayang.cn' + CreateUrl.article(id),
      type: 'article',
    })
    if (datat4 && datat4.code === 0) {
      state.commentTopic = datat4.data
      // 查询评论列表
      const data3 = await ctx.$axios.$get('/api/comment/getReplieds', {
        params: {
          tid: id,
          page: 0,
          size: 10,
        },
      })
      if (data3 && data3.code === 0) {
        state.comments = data3.data
      }
    }
    console.log('一直到这边的state', state)
    return state
  },
  data() {
    return {
      tocdata: [],
    }
  },
  head() {
    return {
      title: this.article.title + ' - 王嘉炀·个人博客',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description.substring(0, 120),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.article.tags + ',个人博客,王嘉炀个人博客，个人网站',
        },
        { hid: 'itemprop-name', itemprop: 'name', content: this.article.title },
        {
          hid: 'itemprop-description',
          itemprop: 'description',
          content: this.article.description.substring(0, 120),
        },
        {
          hid: 'itemprop-image',
          itemprop: 'image',
          content: 'http://stc.wangjiayang.cn/blog/logo.jpg',
        },
      ],
    }
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
      wx.ready(() => {
        updateappmessagesharedata({
          title: this.article.title,
          desc: this.article.description,
          link: location.href,
          imgUrl: this.article.poster,
        })
      })
    })
  },
  methods: {
    tocinit(data) {
      this.tocdata = data
    },
  },
}
</script>
