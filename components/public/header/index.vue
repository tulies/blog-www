<template>
<div class="header">
  <div class="container">
    <div class="logo"><logo/> <span class="desc">做一个有理想的码农</span></div>
    <div class="topnav"><top-nav/></div>
  </div>
  <div class="line"></div>

</div>
</template>
<script>
import Logo from '~/components/Logo.vue'
import TopNav from './nav'

export default {
  components: {
    Logo,
    TopNav
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/config.scss';

.header{
  height: 60px;
  overflow: hidden;
  margin-bottom: 10px;
  .container{
    height: 100%;
    max-width: $maxWeight;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
      // float left
      height: 100%;
      display: flex;
      align-items: center;
      .desc{
        color: #888888;
        padding: 0 10px;
        font-size: 16px;
      }
    }
  }
}




</style>

