<template>
<div class="default-header">
  <div class="container">
    <div class="logo">
      <span class="logo-icon">
        <a href="/"><img src="../../../assets/logo.jpg" /></a>
      </span>
      <span class="desc">致力做一个有理想的码农</span></div>
    <div class="topnav"><top-nav/></div>
  </div>
  <div class="line"></div>

</div>
</template>
<script>
import Logo from './logo.vue'
import TopNav from './nav'

export default {
  components: {
    Logo,
    TopNav
  }
}
</script>

<style lang="scss">
// @import '@/assets/css/config.scss';

.default-header{
  // height: 70px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 10px 0;
  .container{
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    @media screen and  (max-width:540px){
      justify-content: center
    }
    .logo{
      // float left
      height: 100%;
      display: flex;
      align-items: center;
      .logo-icon{
        height: 30px;
        width: 30px;
        display:inline-block;
         @media screen and  (max-width:540px){
            margin-right: 10px;
            height: 24px;
            width: 24px;
        }
        img{
          height: 100%;
          width: auto;
          border-radius: 5px;
        }
      }
      .desc{
        color: #888888;
        padding: 0 10px;
        font-size: 16px;
        @media screen and  (max-width:540px){
          display: none;
        }
      }
    }
  }

  .el-menu.el-menu--horizontal{
    border: none;
  }
  .el-menu--horizontal>.el-menu-item{
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item{
    padding: 0 10px;
  }


}




</style>

