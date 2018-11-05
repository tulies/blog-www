<template>
  <div class="cover-container">
    <el-row class="m-cover">
      <el-col :span="16" class="m-carousel" style="padding-right:0.5%">
        <el-carousel height="100%">
          <el-carousel-item
            v-for="item in list"
            :key="item.img">
            <a :href="item.url"><img :src="item.img"></a>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="8" class="m-pic-aside" style="height:100%">
        <div style="height:50%;padding:0 0 1% 1%;"><a href="https://s.click.taobao.com/cKXIbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224.jpg" width="100%" height="100%"/></a></div>
        <div style="height:50%;padding:1% 0 0 1%;"><a href="https://s.click.taobao.com/czhHbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-taobao.png" width="100%" height="100%"/></a></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list: [
        {
          url: 'https://s.click.taobao.com/dolIbKw',
          img: 'http://tp.nty.tv189.com/h5/bl/adv-aliyun-750-375.jpg'
        }
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
// @import "@/assets/css/index/cover.scss";
.cover-container {
  width: 100%;
  // padding-top: 42.1875%;
  padding-top: 33%;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .m-cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    .m-cover-pic {
      margin: 10px 10px 10px 0;
      width: 100%;
      height: 100%;
      background: url(//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg);
      background-size: 150px;
    }
    .m-carousel {
      height: 100%;
      // width: 100%;
      // margin: 10px;
      // padding: 3%;
      .el-carousel {
        height: 100%;
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
