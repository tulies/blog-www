<template>
  <div class="article-recomment">
    <h2>你可能感兴趣的</h2>
    <ul class="widget-links">
      <li v-for="item in list" :key="item.id">
        <a
          :href="createArticleUrl(item.id)"
          :title="item.title"
          target="_blank"
          >{{ item.title }}</a
        >
        <a
          v-for="t in item.tags.split(',')"
          :key="t"
          class="article-tag ml5"
          taget="_blank"
          :href="createTagUrl(t)"
          >{{ t }}</a
        >
        <span class="text-muted"
          >· {{ item.create_time.substring(0, 10) }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import CreateUrl from '@/util/createUrl'

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  methods: {
    createTagUrl(tag) {
      return CreateUrl.tag(tag)
    },
    createArticleUrl(id) {
      return CreateUrl.article(id)
    },
    clickgo(article) {
      window.location.href = CreateUrl.article(article.id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.article-recomment {
  padding: 10px 0;
  > h2 {
    color: #000000;
    font-weight: bold;
    padding: 10px 0;
    font-size: 18px;
  }
  > ul {
    padding: 0 0 0 25px;
    > li {
      margin-bottom: 3px;
      line-height: 28px;
      list-style: disc;
      a {
        font-weight: 500;
        // &:hover {
        //   text-decoration: underline;
        // }
      }
      .text-muted {
        color: #777;
        font-size: 13px;
        margin: 0 5px;
      }
    }
  }
}
</style>
