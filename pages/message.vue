<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<el-container class="main-container">
  <el-main class="page-main">
    <div class="article-detail">
      <div class="article-content">
        <div class="markdown-body">
          <h2 id="articleHeader0">留言板</h2>
          <p>有什么想说的，尽情吐槽吧...当然，请记得文明留言！</p>
          <p>有什么悄悄话，需要私聊我吗？<a href="#">这里给我私密留言吧>></a></p>
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
