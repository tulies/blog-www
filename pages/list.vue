<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<el-container class="main-container">
  <el-main class="page-main">
    <main-breadcrumb/>
    <article-list/>
  </el-main>
  <el-aside width="320px" style="padding: 0 5px 0 15px;"><index-aside/></el-aside>
</el-container>
<!-- </div> -->
</template>

<script>
import IndexAside from '@/components/index/aside.vue'
import ArticleList from '@/components/articleList/index'
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'

export default {
  components: {
    IndexAside,
    ArticleList,
    MainBreadcrumb
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/config.scss';

.main-container{
  max-width: $maxWeight;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .page-main{
    padding: 0;
  // .page-aside
  // width 240px
  }
}
</style>
