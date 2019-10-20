<template>
<div class="article-item">
  <div class="article-cover" v-if="item.poster">
    <div class="imgcont">
      <img :src="item.poster">
    </div>
  </div>
  <div class="article-detail">
    <h3>{{item.title}}</h3>
    <p class="desc">{{item.description}}</p>
    <dl class="extinfo">
      <dt>
        <span><i class="el-icon-date"></i> {{item.create_time}} </span>
        <a class="article-tag ml5" v-for="tag in item.tags.split(',')" :key="tag" :href="createTagUrl(tag)">{{tag}}</a>
      </dt>
      <dd>
        <!-- <span><i class="el-icon-edit-outline"></i> 评论(<a href="">200</a>)   </span> -->
        <span class="ml5"><i class="el-icon-view"></i> 浏览(<a href="javascript:;">{{item.pv}}</a>)</span>
      </dd>
    </dl>
  </div>
</div>
</template>
<script>
import CreateUrl from '@/util/createUrl'
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    createTagUrl (tag) {
      return CreateUrl.tag(tag)
    }
  }
}
</script>
<style lang="scss" scoped>
.article-item {
  padding: 10px 2px;
  border-bottom: 1px solid #E5E5E5;
  display: flex;

  >.article-cover {
    margin: 3px 10px 0 0;
    overflow: hidden;
    position: relative;
    // width: 20%;
    width: 150px;
    // flex: 1;
    @media screen and  (max-width:900px){
      flex: 0;
      display: none
    }
    // @media screen and  (max-width:768px){
    //   flex: 0;
    //   display: none
    // }
    >.imgcont{
      width: 100%;
      padding-top:56.25%;
      border-radius: 4px;
      overflow: hidden;
      >img {
        width: 100%;
        vertical-align: middle;
        position:absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

    }

  }
  >.article-detail {
    flex: 1;
    overflow: hidden;
    // @media screen and  (max-width:768px){
    //   flex: 0;
    //   display: none
    // }
    h3 {
      color: #000000;
      font-size: 16px;
      line-height: 24px;
      cursor:pointer;
      display: inline-block;
    }
    .desc{
      color: #888888;
      font-size: 13px;
      line-height: 20px;
      max-height: 39px;
      display: -webkit-box;
      word-break: normal;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;

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
