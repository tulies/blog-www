<template>
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect">
  <el-menu-item index="1">首页</el-menu-item>
  <el-submenu index="2">
    <template slot="title">前端技术</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <!-- <el-submenu index="2-4">
      <template slot="title">后端技术</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu> -->
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">后端技术</template>
    <el-menu-item index="3-1">JAVA</el-menu-item>
    <el-menu-item index="3-2">PHP</el-menu-item>
    <el-menu-item index="3-3">GO</el-menu-item>
  </el-submenu>
  <el-submenu index="4">
    <template slot="title">其他技术</template>
    <el-menu-item index="4-1">Linux</el-menu-item>
    <el-menu-item index="4-2">数据库</el-menu-item>
  </el-submenu>
  <el-menu-item index="5">WIKI</el-menu-item>
  <el-menu-item index="6">生活日记</el-menu-item>
  <el-menu-item index="7">关于我</el-menu-item>
  <el-menu-item index="8"><a target="_blank">留言板</a></el-menu-item>
</el-menu>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>
