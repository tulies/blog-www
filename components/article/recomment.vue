<template>
<div class="article-recomment">
  <h2>你可能感兴趣的</h2>
  <ul class="widget-links">
    <li v-for="item in list" :key="item.id">
      <a :href="item.url" :title="item.title" target="_blank">{{item.title}}</a>
      <a v-for="t in item.tags.split(',')" :key="t" class="tag" taget="_blank" :href="'/tag?tag='+t">{{t}}</a>
      <span class="text-muted">· {{item.create_time.substring(0, 10)}}</span>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
    }
  }
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
        &:hover {
          text-decoration: underline;
        }
      }
      .text-muted {
        color: #777;
        font-size: 13px;
        margin: 0 10px;
      }
      .tag {
        font-weight: normal;
        margin: 0 5px 0 0;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        padding: 0 3px;
        display: inline-block;
        color: $mainColor;
        background-color: $plainColor;
        text-align: center;
      }
    }
  }
}
</style>

