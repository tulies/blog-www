<template>
  <div>
    <cover/>
    <main-title-bar/>
    <article-list/>
  </div>
</template>
<script>
import Cover from './cover.vue'
import MainTitleBar from '../widgets/mainTitleBar'
import ArticleList from '../articleList/index.vue'

export default {
  components: {
    Cover,
    ArticleList,
    MainTitleBar
  }
}
</script>
<style lang="scss" scoped>

</style>

