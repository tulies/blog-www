<template>
<section class="m-article-list">
  <ul v-if="list && list.length>0">
    <li v-for="item in list" :key="item.id" @click="click(item)"><item :item="item"/></li>
  </ul>
  <div v-else>
    <el-alert
      title="暂无数据！"
      type="info"
      center
      :closable="false"
      show-icon>
    </el-alert>
  </div>
</section>
</template>
<script>
import Item from './item'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  components: {
    Item
  },
  methods: {
    click (item) {
      window.location.href = `/article?id=${item.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.m-article-list {
  width: 100%;
  // margin-left: 20px;
}
</style>
