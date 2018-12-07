<template>
<el-card class="aside-box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>文章目录</span>
  </div>
  <el-tree
    class="toctree"
    :data="tocdata"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <a :href="'#'+data.hash">{{ node.label }}</a>
    </span>
  </el-tree>
</el-card>
</template>
<script>

export default {
  props: {
    tocdata: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>


<style lang="scss">
// @import '@/assets/css/config.scss';
.aside-box-card {
  .toctree{
    max-height: 350px;
    overflow-y: scroll;
    .el-tree-node__content{
      height: auto;
    }
    .custom-tree-node > a{
      height: auto;
      white-space: normal;
      color: #303133
    }
  }
}
</style>


