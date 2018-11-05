<template>
<div class="title-bar">
  <dl class="pull-left">
    <dt>{{title}}</dt>
    <dd v-for="k in keywords" :key="k.name"><a :href="k.url">{{k.name}}</a></dd>
  </dl>
  <dl class="pull-right">
    <dd v-for="m in mores" :key="m.name"><a :href="m.url">{{m.name}}</a></dd>
  </dl>
</div>

</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    keywords: {
      type: Array,
      default: []
    },
    mores: {
      type: Array,
      default: null
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/config.scss";
.title-bar {
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  font-size: 14px;
  border-bottom: $mainColor 2px solid;
  // margin-top: 10px;
  // cursor:pointer;
  dl {
    display: flex;
    dt {
      font-size: 18px;
      // margin-left: 13px;
      margin-right: 10px;
      padding: 0 5px;
    }
    dd {
      padding: 0 5px;
      position: relative;
      color: #888888;
      cursor: pointer;
    }
  }
  a {
    color: #888888;
    text-decoration: none;
  }

  a:focus,
  a:hover {
    color: #66b1ff;
  }

  a:active {
    color: #3a8ee6;
  }
}
</style>


