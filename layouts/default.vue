<template>
  <div class="layout-default">
    <el-row>
      <el-col :span="24">
        <div class="layout-default-maxarea">
          <my-header />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="24"
        style="min-height:200px;"
      >
        <div class="layout-default-maxarea body-content">
          <el-alert
            style="margin-bottom:8px;"
            :closable="closeable"
            type="warning"
            title=""
            show-icon
          >
            <slot><span style="font-size:13px;">欢迎您的访问，本博客持续建设中~~ 若有不适，请多多见谅，欢迎给我<a href="/message">留言反馈</a>！</span> -- 2019.10.10</slot>
          </el-alert>
          <nuxt />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="layout-default-maxarea">
          <my-footer />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  },
  data () {
    return {
      closeable: true
    }
  }
}
</script>
<style lang="scss">

</style>
