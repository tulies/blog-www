<template>
<el-row class="article-item">
  <el-col :span="6" class="article-cover">
    <img :src="item.poster">
    </el-col>
  <el-col :span="18" class="article-detail">
    <h3>{{item.title}}</h3>
    <p class="desc">{{item.description}}</p>
    <dl class="extinfo">
      <dt>
        <span><i class="el-icon-date"></i> {{item.create_time}} </span>
        <a class="article-tag" v-for="tag in item.tags.split(',')" :key="tag" :href="`/tag?tag=${tag}`">{{tag}}</a>
      </dt>
      <dd>
        <!-- <span><i class="el-icon-edit-outline"></i> 评论(<a href="">200</a>)   </span> -->
        <span class="ml5"><i class="el-icon-view"></i> 浏览(<a href="javascript:;">{{item.pv}}</a>)</span>
      </dd>
    </dl>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>
<style lang="scss" scoped>
.article-item {
  padding: 10px 2px;
  border-bottom: 1px solid #E5E5E5;
  >.article-cover {
    padding: 3px 10px 0 0;
    overflow: hidden;
    >img {
      border-radius: 4px;
      width: 100%;
    }
  }
  >.article-detail {
    h3 {
      color: #000000;
      font-size: 16px;
      line-height: 30px;
      cursor:pointer;
      display: inline-block;
    }
    .desc{
      color: #888888;
      font-size: 14px;
      line-height: 20px;
    }
    >.extinfo{
      color: #444444;
      padding-top: 5px;
      overflow: hidden;
      font-size: 13px;
      line-height: 18px;
      dt {
        float: left;
      }
      dd{
        float: right;
      }
      .tag{
        margin-left: 5px;
        cursor: pointer
      }
    }
  }
}
</style>
