<template>
<!-- <div > -->
  <!-- <div class="page-main"><index-main/></div>
  <div class="page-aside hidden-sm-and-down"><index-aside/></div> -->
<el-container class="main-container">
  <el-main class="page-main">
    <article-detail/>
    <div><img src="../assets/img/adv-1200-120.jpg" width="100%"/></div>
    <article-recomment/>
    <article-comment/>
  </el-main>
  <el-aside width="320px" style="padding: 0 5px 0 15px;"><index-aside/></el-aside>
</el-container>
<!-- </div> -->
</template>

<script>
import IndexAside from '@/components/index/aside.vue'
import IndexMain from '@/components/index/main.vue'
import ArticleDetail from '@/components/article/detail.vue'
import ArticleRecomment from '@/components/article/recomment.vue'
import ArticleComment from '@/components/article/comment.vue'

export default {
  components: {
    IndexAside,
    IndexMain,
    ArticleDetail,
    ArticleRecomment,
    ArticleComment
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/config.scss";
.main-container {
  max-width: $maxWeight;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .page-main {
    padding: 0;
    overflow: hidden;
  }
}
</style>
