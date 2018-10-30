<template>
<section class="m-article-list">
  <ul>
    <li>
      <item/>
      <item/>
      <item/>
      <item/>
      <item/>
      <item/>
      <item/>
      <item/>
    </li>
  </ul>
  <div class="article-pagination">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>

</section>
</template>
<script>
import Item from './item'
export default {
  components: {
    Item
  }
}
</script>
<style lang="scss" scoped>
.m-article-list {
  width: 100%;
  // margin-left: 20px;
  .article-pagination {
    padding: 10px 5px;
  }
}
</style>
