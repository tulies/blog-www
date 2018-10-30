<template>
<dl class="title-bar">
  <dt>文章推荐</dt>
  <dd>Vue</dd>
  <dd>ReactJS</dd>
  <dd>Koa2</dd>
</dl>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '@/assets/css/config.scss';
dl.title-bar {
  height: 44px;
  line-height: 44px;
  display: flex;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: $mainColor 4px solid;
  // margin-top: 10px;
  cursor:pointer;
  dt {
    font-size: 18px;
    // margin-left: 13px;
    margin-right: 10px;
    padding: 0 5px;
  }

  dd {
    padding: 0 5px;
    position: relative;
    color #888888
    &:after {
      position: absolute;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 7px solid #fff;
      content: " ";
      display: block;
      width: 2px;
      height: 0;
      top: 37px;
      left: 0;
      right: 0;
      margin: auto;
      display: none;
    }

    &.active:after {
      display: block;
    }
  }
}
</style>


