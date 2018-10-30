<template>
<el-row class="article-item">
  <el-col :span="6" class="article-cover">
    <img src="https://p0.meituan.net/travel/83544ca4b38bbe0f7644982c3528defd117921.jpg">
    </el-col>
  <el-col :span="18" class="article-detail">
    <h3>Javascript设计模式之"观察者模式"</h3>
    <p class="desc">前言：最近在看vuejs相关源码的时候发现，有个词语反复的出现在自己的脑海里。那么是哪个神奇的词语呢？就是大家经常听到的“观察者模式" ，对于前端而言用（发布-订阅）模式，来描述它更加亲切。 一、什么是观察者模式？...</p>
    <dl class="extinfo">
      <dt>
        <span><i class="el-icon-date"></i> 2018-10-28 </span>
        <el-tag size="mini">标签</el-tag>
      </dt>
      <dd>
        <span><i class="el-icon-edit-outline"></i> 评论<el-badge class="mark" :value="12" />   </span>
        <span><i class="el-icon-view"></i> 浏览<el-badge class="mark" :value="12" /></span>
      </dd>
    </dl>
  </el-col>
</el-row>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.article-item {
  padding: 10px 2px;
  border-bottom: 1px solid #E5E5E5;
  >.article-cover {
    padding: 5px 10px 0 0;
    overflow: hidden;
    >img {
      border-radius: 5px;
      width: 100%;
    }
  }
  >.article-detail {
    h3 {
      color: #000000;
      font-size: 16px;
      line-height: 30px;
    }
    .desc{
      color: #888888;
      font-size: 14px;
      line-height: 20px;
    }
    >.extinfo{
      color: #444444;
      padding-top: 5px;

      dt {
        float: left;
      }
      dd{
        float: right;
      }
    }
  }
}
</style>
