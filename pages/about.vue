<template>

<div class="default-page-container">
  <section class="default-page-main">
    <div class="article-detail">
      <div class="article-content">
        <div class="markdown-body">
          <h2 id="articleHeader0">关于我</h2>
          <!-- 我叫王嘉炀 -->
          <p>hello，大家好。很高心躲在这里被你发现了！<!-- <a href="#">让我知道下你是如何找到我的>></a> --></p>
          <p>我也没什么牛逼的经历，<!-- 前端、后端都会搞搞，这里就不献丑了；-->但是我和你一样，拥有一颗爱进取的初心~~</p>

          <h2 id="articleHeader1">关于本博客</h2>
          <!-- <blockquote>写在最前：本博客前端门户采用nuxt构建的项目（vue2.x+koa2），文章发布平台采用的springBoot+reactjs。<br/><a href="#">本博客的前端静态代码github开源,有兴趣的随意fork，欢迎指正。</a>不过请记得给我挂个友情链接。</blockquote> -->
          <p>一直以来，我都有一个博客梦。还记得这几年断断续续亲手敲代码搞过好几个博客，最后都觉得不是自己想要的，也没写过几篇文章就放弃了。</p>
          <p>曾经也想用现有的博客平台，比如csdn、掘金、segmentfault等，但是总觉得牵制于人，非常不习惯，最后又是一度放弃了。</p>
          <p>再后来就随便找了个云笔记写写，比如为知笔记（支持linux、mac、windows），也还不错，记录了很多学习笔记，可更多是直接复制黏贴别人的知识点。</p>
          <p><!-- 最近可能是学习比较认真吧，遇到的问题、碰到的坑实在太多；-->可总觉得想做点什么，最后想想，还是自己搞个在线博客吧，说不准可以帮助到谁谁谁呢。</p>

          <h2 id="articleHeader1">联系我</h2>
          <p>我是相当的宅，不擅长社交。。。微博基本没用过，qq、微信也很少更新。所以大家尽量还是给我邮件吧，我定会认真阅读你的来信！当然，最佳方式还是直接在本博客留言吧，<a href="/message">留言板</a>。</p>
          <ul>
            <li>邮箱：<a href="mailto:346461062@qq.com">346461062@qq.com</a></li>
            <li>GitHub：<a href="https://github.com/tulies">@tulies</a></li>
            <li>微博：<a href="https://weibo.com/u/6341197258">@王嘉炀Tulies</a></li>
          </ul>

          <pre>
/**
* Created by 王嘉炀.
* CreateDate: 2018/10/28
* UpdateDate: 2019/10/20
* 一年没更新呢，实在惭愧。。。
*/
          </pre>

        </div>
      </div>
      <zan/>
      <article-comment :comments="comments" :tid="tid"/>
    </div>

    <!-- <div><a href="https://s.click.taobao.com/dolIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-1200-120.jpg" width="100%"/></a></div> -->

    <!-- <article-comment/> -->
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
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import Zan from '@/components/widgets/zan'
import ArticleComment from '@/components/comment/index.vue'

export default {
  components: {
    MainBreadcrumb,
    AsideNav,
    AsideArticleRec,
    ArticleComment,
    Zan
  },
  middleware: ['hotArticleRec', 'newArticleRec'],
  async asyncData (ctx) {
    let state = {
      tid: 'message',
      comments: {
        total: 0,
        page: 0,
        size: 10,
        list: []
      }
    }
    // 查询评论列表
    const { status: status3, data: data3 } = await ctx.$axios.get(`/api/comment/getReplieds`, {
      params: {
        tid: state.tid,
        page: 0,
        size: 10
      }
    })
    if (status3 === 200) {
      if (data3.code === 0) {
        state.comments = data3.data
      } else if (data3.code === 401) {
        // 调用主题创建
        await ctx.$axios.post(`/api/comment/initTopic`, {
          tid: state.tid,
          title: '留言板',
          url: 'http://www.wangjiayang.cn/message',
          type: ''
        })
      }
    }
    return state
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/config.scss";
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
