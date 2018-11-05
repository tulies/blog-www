<template>

<div class="title-bar">
  <el-breadcrumb class="pull-left" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name"><a :href="item.url">{{item.name}}</a></el-breadcrumb-item>
  </el-breadcrumb>
  <dl class="pull-right">
    <dd v-for="item in mores" :key="item.name"><a :href="item.url">{{item.name}}</a></dd>
  </dl>
</div>
</template>
<script>
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: []
    },
    mores: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.title-bar {
  // height: 44px;
  // line-height: 44px;
  // display: flex;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: $mainColor 2px solid;
  padding: 10px 0;
  overflow: hidden;
  // cursor:pointer;
  dt {
    font-size: 18px;
    // margin-left: 13px;
    margin-right: 10px;
    padding: 0 5px;
  }

  dd {
    padding: 0 5px;
    position: relative;
    color: #888888;
    float: right;
    a {
      color: #888888;
      text-decoration: none;
    }

    a:focus,
    a:hover {
      color: #66b1ff;
    }

    a:active {
      color: #3a8ee6;
    }
  }
}
</style>


