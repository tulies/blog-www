<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<el-container class="main-container">
  <el-main class="page-main">
    <div class="article-detail">
      <div class="article-content">
        <div class="markdown-body">
          <h2 id="articleHeader0">关于我</h2>
          <p>hello，大家好，我叫王嘉炀。很高心躲在这里被你发现了！<a href="#">让我知道下你是如何找到我的>></a></p>
          <p>我也没什么牛逼的经历，前端、后端都会搞搞，这里就不献丑了；但是我和你一样，拥有一颗爱进取的心~~</p>

          <h2 id="articleHeader1">关于本博客</h2>
          <blockquote>写在最前：本博客前端门户采用nuxt构建的项目（vue2.x+koa2），文章发布平台采用的springBoot+reactjs。<br/><a href="#">本博客的前端静态代码github开源,有兴趣的随意fork，欢迎指正。</a>不过请记得给我挂个友情链接。</blockquote>
          <p>一直以来，我都有一个博客梦。还记得这几年断断续续亲手敲代码搞过好几个博客，最后都觉得不是自己想要的，也没写过几篇文章就放弃了。</p>
          <p>曾经也想用现有的博客平台，比如csdn、掘金、segmentfault等，但是总觉得牵制于人，非常不习惯，最后又是一度放弃了。</p>
          <p>再后来就随便找了个云笔记写写，比如为知笔记（支持linux、mac、windows），也还不错，记录了很多学习笔记，可更多是直接复制黏贴别人的知识点。</p>
          <p>最近可能是学习比较认真吧，遇到的问题、碰到的坑实在太多；最后想想，还是再搞个在线博客吧，说不准可以帮助到谁谁谁呢。</p>

          <h2 id="articleHeader1">联系我</h2>
          <p>我是相当的宅，不擅长社交。。。微博基本没用过，qq、微信也很少更新。所以大家尽量还是给我邮件吧，我定会认真阅读你的来信！当然，最佳方式还是直接在本博客留言吧，<a href="">留言板</a>&<a href="">私密留言</a>。</p>
          <ul>
            <li>邮箱：<a href="mailto:346461062@qq.com">346461062@qq.com</a></li>
            <li>GitHub：<a href="https://github.com/tulies">@tulies</a></li>
            <li>博客圈子：<a href="https://github.com/tulies">@tulies</a></li>
          </ul>

          <pre>
/**
* Created by 王嘉炀.
* CreateDate: 2018/10/28
* UpdateDate: 2018/10/28
*/
          </pre>

        </div>
      </div>

      <dl class="giveme">
        <dt><el-button type="primary" plain style="width:100%">赞赏支持</el-button></dt>
        <dd>如果觉得我的文章对你有用，请随意赞赏</dd>
      </dl>
    </div>

    <div><img src="../assets/img/adv-1200-120.jpg" width="100%"/></div>

    <article-comment/>
  </el-main>
  <el-aside width="320px" style="padding: 0 5px 0 15px;"><index-aside/></el-aside>
</el-container>
<!-- </div> -->
</template>

<script>
import IndexAside from '@/components/index/aside.vue'
import ArticleComment from '@/components/article/comment.vue'
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'

export default {
  components: {
    ArticleComment,
    IndexAside,
    MainBreadcrumb
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/config.scss";
@import "github-markdown-css/github-markdown.css";

.main-container {
  max-width: $maxWeight;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .page-main {
    padding: 0;
    overflow: hidden;
  }
}

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
