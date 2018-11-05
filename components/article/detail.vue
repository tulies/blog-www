<template>
<div class="article-detail">
  <h3 class="article-title">{{article.title}}</h3>
  <dl class="extinfo">
    <dt>
      <span><i class="el-icon-date"></i> {{article.create_time}}发布 </span>
      <a class="ml5 article-tag" v-for="tag in article.tags.split(',')" :key="tag" :href="`/tag?tag=${tag}`">{{tag}}</a>
      <span><i class="el-icon-view ml5"></i> {{article.pv}}次阅读</span>
    </dt>
    <!-- <dd>
      <el-badge :value="200" :max="99">
            <el-button size="mini">评论</el-button>
      </el-badge>
    </dd> -->
  </dl>
  <div class="article-content">
    <div class="markdown-body" v-html="article.content"></div>
  </div>
  <dl class="giveme">
    <dt><el-button type="primary" plain style="width:100%">赞赏支持</el-button></dt>
    <dd>如果觉得我的文章对你有用，请随意赞赏</dd>
  </dl>
</div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss">
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
    font-size: 13px;

    dt {
      float: left;
    }
    dd {
      float: right;
      margin-right: 40px;
    }
    .tag{
      cursor: pointer
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

