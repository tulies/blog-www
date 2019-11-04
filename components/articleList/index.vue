<template>
  <section
    ref="articlelist"
    class="m-article-list"
  >
    <ul v-if="list && list.length>0">
      <li
        v-for="it in list"
        :key="it.id"
        @click="click(it)"
      >
        <item :item="it" />
      </li>
    </ul>
    <div v-else>
      <el-alert
        title="暂无数据！"
        type="info"
        center
        :closable="false"
        show-icon
      />
    </div>
  </section>
</template>
<script>
import Item from './item'
import createUrl from '@/util/createUrl'

export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  mounted () {
  },
  methods: {
    click (item) {
      window.location.href = createUrl.article(item.id)
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
