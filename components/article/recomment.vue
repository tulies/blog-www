<template>
<div class="article-recomment">
  <h2>你可能感兴趣的</h2>
  <!-- <ul>
    <li><a href="#">精读《高性能 javascript》Belindajavascript前端</a></li>
    <li><a href="#">精读《sqorn 源码》黄子毅源码学习源码分析javascript</a></li>
    <li><a href="#">使用 NodeJS 可读流实现 “行读取器”PandaShenstreamnode.js</a></li>
    <li><a href="#">精读《重新思考 Redux》黄子毅typescriptjavascript</a></li>
    <li><a href="#">精读《Typescript2.0 - 2.9》黄子毅typescriptnode.jsjavascript</a></li>
    <li><a href="#">精读《谈谈 Web Workers》黄子毅javascript</a></li>
    <li><a href="#">精读《SQL vs Flux》黄子毅sql</a></li>
    <li><a href="#">精读《图解HTTP》Belinda前端工程师前端javascripthttp</a></li>
  </ul> -->

  <ul class="widget-links">
    <li v-for="item in list" :key="item.id">
      <a :href="item.url" :title="item.title" target="_blank">{{item.title}}</a>
      <span class="text-muted">{{item.author}}</span>
      <a v-for="t in item.tag.split(',')" :key="t" class="tag" taget="_blank" :href="'/tag/'+t">{{t}}</a>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          id: '121',
          title: '杂谈：前端Web通信',
          author: '以乐之名',
          url: 'https://segmentfault.com/a/1190000015809504',
          tag: 'html5,javascript'
        },
        {
          id: '1321',
          title: '精读《sqorn 源码》',
          author: '黄子毅',
          url: 'https://segmentfault.com/a/1190000016419523',
          tag: '源码学习,源码分析,javascript'
        },
        {
          id: '121',
          title: '精读《图解HTTP》',
          author: '黄子毅',
          url: 'https://segmentfault.com/a/1190000015809504',
          tag: 'typescript,javascript'
        },
        {
          id: '1321',
          title: '精读《高性能 javascript》',
          author: '白霸天',
          url: 'https://segmentfault.com/a/1190000016419523',
          tag: '前端,javascript'
        },
        {
          id: '1321',
          title: '精读《sqorn 源码》',
          author: '黄子毅',
          url: 'https://segmentfault.com/a/1190000016419523',
          tag: '源码学习,源码分析,javascript'
        },
        {
          id: '121',
          title: '精读《图解HTTP》',
          author: '黄子毅',
          url: 'https://segmentfault.com/a/1190000015809504',
          tag: 'typescript,javascript'
        }
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/css/config.scss';
.article-recomment {
  padding: 10px 0;
  > h2 {
    color: #000000;
    font-weight: bold;
    padding: 10px 0;
    font-size: 18px;
  }
  > ul {
    padding: 0 0 0 25px;
    > li {
      margin-bottom: 3px;
      line-height: 28px;
      list-style: disc;
      a {
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
      .text-muted {
        color: #777;
        font-size: 13px;
        margin: 0 10px;
      }
      .tag {
        font-weight: normal;
        margin: 0 5px 0 0;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        padding: 0 3px;
        display: inline-block;
        color: $mainColor;
        background-color: $plainColor;
        text-align: center;
      }
    }
  }
}
</style>

