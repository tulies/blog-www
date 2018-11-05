<template>
<el-card class="aside-box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <el-button v-if="more" style="float: right; padding: 0" type="text">{{more.title}}</el-button>
  </div>
  <dl v-for="item in list" :key="item.id" class="item">
    <dt><a :href="`/article?id=${item.id}`">{{item.title}}</a></dt>
    <dd v-if="item.desc">{{item.desc}}</dd>
  </dl>
</el-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    more: {
      type: Object,
      default: null
    },
    list: {
      type: Array
    }
  }
  // data () {
  //   return {
  //     // title: '热门文章',
  //     // more: {
  //     //   title: '更多精彩'
  //     // }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.aside-box-card {
  .item {
    font-size: 14px;
    margin-bottom: 10px;
    line-height: 20px;
    >dt a{
      color: #303133;

      &:hover{
        color: $mainColor;
      }
    }
    >dd{
      color: #888888;
      font-size: 12px;
    }
    &:last-of-type{
      margin-bottom: 0;
    }
  }
}

</style>
