<template>
  <dl class="giveme">
    <dt>
      <el-popover placement="top" title="" width="150" :trigger="trigger">
        <div style="display: flex; overflow: hidden">
          <span style="flex: 1; padding: 5px"
            ><img src="../../assets/img/ewm_wx.png" style="width: 100%"
          /></span>
          <!-- <span style="flex:1; padding: 5px;"><img src="../../assets/img/ewm_zfb.png"  style="width:100%" /></span> -->
        </div>
        <el-button slot="reference" type="primary" plain style="width: 100%">
          赞赏支持
        </el-button>
      </el-popover>
    </dt>
    <dd>如果觉得我的文章对你有用，请随意赞赏</dd>
  </dl>
</template>
<script>
export default {
  data() {
    return {
      trigger: 'click',
    }
  },
  beforeMount() {
    if (!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
      this.trigger = 'hover'
    }
  },
}
</script>

<style lang="scss" scoped>
.giveme {
  text-align: center;
  padding: 10px 0;
  > dt {
    width: 200px;
    margin: 0 auto;
  }
  > dd {
    padding: 10px 0;
    color: #888888;
    font-size: 12px;
  }
}
</style>
