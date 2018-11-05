<template>
<div class="layout-default">
  <el-row>
    <el-col :span="24"><my-header/></el-col>
  </el-row>
  <el-row>
    <el-col :span="24" style="min-height:200px;">
      <div class="body-content">
        <el-alert
          style="margin-bottom:5px;"
          title="欢迎您的访问，本博客目前正在建设中，很多功能暂未实现~~ 若有不适，请多多见谅！"
          close-text="查看我的开发进度"
          :closable="closeable"
          type="warning"
          @close="close"
          show-icon>
        </el-alert>
        <nuxt/>
      </div>
    </el-col>
  </el-row>
  <el-row>
        <el-col :span="24"><my-footer/></el-col>
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
    },
    methods: {
      close () {
        this.closeable = false
        console.log(1111)
      }
    }
  }
</script>
<style lang="scss">
@import '@/assets/css/config.scss';
.layout-default{
    -webkit-font-smoothing: antialiased;
    font-family: "-apple-system",
    BlinkMacSystemFont,
    Roboto,
    "Helvetica Neue",
    "MIcrosoft YaHei",
    sans-serif !important;
    background-color: #FFFFFF;
    .body-content{
      max-width: $maxWeight;
      margin: 0 auto;
    }
}
</style>

