<template>

<div class="title-bar">
  <el-breadcrumb class="pull-left left-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name"><a :href="item.url">{{item.name}}</a></el-breadcrumb-item>
  </el-breadcrumb>
  <dl :class="{'pull-right mores': true,'mores-open': mores.length>1}" v-if="mores && mores.length > 0">
    <dd v-for="item in mores" :key="item.name"><a :href="item.url">{{item.name}}</a></dd>
  </dl>
  <div class="pull-right mores mores-close" v-if="mores.length>1">
    <el-dropdown >
      <span class="el-dropdown-link">
        全部<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in mores" :key="item.name"><a :href="item.url">{{item.name}}</a></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
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

  .left-breadcrumb{
    padding: 5px 0;
  }
  .mores{
    padding: 5px 0;
  }
  .mores-open{
    @media screen and  (max-width:420px){
      display: none;
    }
  }
  .mores-close{
    display: none;
    @media screen and  (max-width:420px){
      display: inline-block;
    }
  }
}
</style>


