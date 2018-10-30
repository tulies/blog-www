<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <el-button style="float: right; padding: 3px 0" type="text">{{more.title}}</el-button>
  </div>
  <dl v-for="item in list" :key="item.id" class="item">
    <dt>{{item.title}}</dt>
    <dd v-if="item.desc">{{item.desc}}</dd>
  </dl>
</el-card>
</template>
<script>
export default {
  data () {
    return {
      title: '热门文章',
      more: {
        title: '更多精彩'
      },
      list: [
        {
          id: '323443',
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        },
        {
          id: '324353',
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        },
        {
          id: '322333',
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        },
        {
          id: '32433',
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        },
        {
          id: '32333',
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        },
        {
          title: '用AI给黑白照片上色，复现记忆中的旧时光',
          desc: '阅读量：48230'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {

  // .clearfix:before,
  // .clearfix:after {
  //   display: table;
  //   content: "";
  // }
  // .clearfix:after {
  //   clear: both
  // }
  .item {
    font-size: 14px;
    margin-bottom: 18px;
    line-height: 20px;
    >dd {
      color: #888888;
      font-size: 12px;
    }
  }
}
</style>
