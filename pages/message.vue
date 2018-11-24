<template>
<div class="default-page-container">
  <section class="default-page-main">
    <div class="article-detail">
      <div class="article-content">
        <div class="markdown-body">
          <h2 id="articleHeader0">留言板</h2>
          <p>有什么想说的，尽情吐槽吧...当然，请记得文明留言！</p>
          <p>有什么悄悄话，需要私聊我吗？<a href="#">这里给我私密留言吧>></a></p>
        </div>
      </div>
      <zan/>
    </div>
    <div><a href="https://s.click.taobao.com/dolIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-1200-120.jpg" width="100%"/></a></div>
    <article-comment :topic="commentTopic" :comments="comments"/>
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
</template>

<script>
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleComment from '@/components/comment/index.vue'
import Zan from '@/components/widgets/zan'

export default {
  components: {
    ArticleComment,
    MainBreadcrumb,
    AsideNav,
    AsideArticleRec,
    Zan
  },
  middleware: ['hotArticleRec', 'newArticleRec'],
  async asyncData (ctx) {
    let state = {
      tid: 'message',
      commentTopic: {},
      comments: {
        total: 0,
        page: 0,
        size: 10,
        list: []
      }
    }

    // 调用主题创建
    const { status, data } = await ctx.$axios.post(`/api/comment/initTopic`, {
      tid: state.tid,
      title: '留言板',
      url: 'http://www.wangjiayang.cn/message',
      type: ''
    })
    if (status === 200 && data.code === 0) {
      state.commentTopic = data.data
      // 查询评论列表
      const { status: status3, data: data3 } = await ctx.$axios.get(`/api/comment/getReplieds`, {
        params: {
          tid: state.tid,
          page: 0,
          size: 10
        }
      })
      console.log(status3, data3)
      if (status3 === 200 && data3.code === 0) {
        state.comments = data3.data
      }
    }

    console.log(state)
    return state
  }
}
</script>

<style scoped lang="scss">
@import "github-markdown-css/github-markdown.css";
.article-detail {
  padding: 10px 0;
  .article-title {
    font-size: 18px;
    line-height: 30px;
    color: #000000;
    padding: 10px 0;
  }
  .extinfo {
    color: #444444;
    padding-top: 5px;

    dt {
      float: left;
    }
    dd {
      float: right;
      margin-right: 40px;
    }
  }
  .article-content {
    padding: 30px 0;
    clear: both;
  }
  .giveme {
    text-align: center;
    padding: 10px 0;
    >dt{
      width: 200px;
      margin: 0 auto;
    }
    >dd{
      padding: 10px 0;
      color: #888888;
      font-size: 12px;
    }
  }
}
</style>
