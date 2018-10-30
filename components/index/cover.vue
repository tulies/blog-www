<template>
  <div class="m-life">
    <el-row>
      <el-col :span="18">
        <slider/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-pic"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slider from './slider.vue'
export default {
  components: {
    Slider
  }
}
</script>


<style lang="scss">
@import '@/assets/css/index/cover.scss';
</style>
