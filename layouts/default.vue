<template>
<div class="layout-default">
  <el-row>
    <el-col :span="24"><my-header/></el-col>
  </el-row>
  <el-row>
        <el-col :span="24"><nuxt/></el-col>
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
    }
  }
</script>
<style lang="scss">

.layout-default{
    -webkit-font-smoothing: antialiased;
    font-family: "-apple-system",
    BlinkMacSystemFont,
    Roboto,
    "Helvetica Neue",
    "MIcrosoft YaHei",
    sans-serif !important;
    background-color: #FFFFFF;
}
</style>

