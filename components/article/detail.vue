<template>
<div class="article-detail">
  <h3 class="article-title">{{article.title}}</h3>
  <dl class="extinfo">
    <dt>
      <span><i class="el-icon-date"></i> {{article.create_time}}发布 </span>
      <a class="ml5 article-tag" v-for="tag in article.tags.split(',')" :key="tag" :href="`/tag/${tag}`">{{tag}}</a>
      <span><i class="el-icon-view ml5"></i> {{article.pv}}次阅读</span>
    </dt>
    <!-- <dd>
      <el-badge :value="200" :max="99">
            <el-button size="mini">评论</el-button>
      </el-badge>
    </dd> -->
  </dl>
  <div class="article-content">
    <div class="markdown-body" v-html="markedContent(article.content)"></div>
  </div>
  <zan/>
</div>
</template>
<script>
import marked from 'marked'
import Zan from '../widgets/zan'
export default {
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  components: {
    Zan
  },
  methods: {
    markedContent (content) {
      return marked(content)
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
}

</style>

