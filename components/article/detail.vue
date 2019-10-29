<template>
<div class="article-detail">
  <h3 class="article-title">{{article.title}}</h3>
  <dl class="extinfo">
    <dt>
      <span><i class="el-icon-date"></i> {{article.create_time}}发布 </span>
      <a class="ml5 article-tag" v-for="tag in article.tags.split(',')" :key="tag" :href="`/tag/${tag}`">{{tag}}</a>
      <span><i class="el-icon-view ml5"></i> {{article.pv}}次阅读</span>
    </dt>
    <!-- <dd>
      <el-badge :value="200" :max="99">
            <el-button size="mini">评论</el-button>
      </el-badge>
    </dd> -->
  </dl>
  <div class="article-content">
    <div class="markdown-body" v-html="markedContent(article.content)"></div>
  </div>
  <zan/>
</div>
</template>
<script>
import marked from 'marked'
import Zan from '../widgets/zan'
// import utils from '@/util/utils'
import pinyin from 'js-pinyin'
export default {
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  components: {
    Zan
  },
  methods: {
    markedContent (content) {
      // Get reference
      const renderer = new marked.Renderer()

      // Override function
      renderer.heading = function (text, level) {
        // var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
        let escapedText = text.toLowerCase().replace(/[^(\u4e00-\u9fa5A-Z0-9a-z)]+/g, '')
        escapedText = pinyin.getFullChars(escapedText).substring(0, 32)
        // const rd = utils.getUUID()
        // const aname = escapedText
        return `
          <h${level} data-id="${escapedText}" title="${text}">
            <a name="${escapedText}" class="heading-anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>
            ${text}
          </h${level}>`
      }
      marked.setOptions({ breaks: true, renderer: renderer })
      return marked(content)
    }
  },
  mounted () {
    const domlist = document.querySelector('.article-detail .markdown-body').querySelectorAll('h1, h2, h3, h4, h5')
    // document.querySelector('.article-detail .markdown-body').escapedText
    let nodelist = []
    let i = 1
    domlist.forEach(element => {
      nodelist.push({
        id: i,
        level: parseInt(element.nodeName.substring(1)),
        hash: element.getAttribute('data-id'),
        // label: element.getAttribute('title')
        label: element.innerText
      })
      i++
    })
    let treelist = []
    let h1set = null
    let h2set = null
    let h3set = null
    let h4set = null
    // let h5set = null
    const length = nodelist.length
    nodelist.forEach((element, index) => {
      if (h1set === null) {
        h1set = element
      } else {
        // 比较一下当前当前的level
        if (element.level <= h1set.level) {
          treelist.push(h1set)
          h1set = element
          h2set = null
          h3set = null
          h4set = null
        } else {
          // 判断 h2set是否为空，为空的话 就直接塞到h2set，不然就判断有没有h2set大
          if (h2set === null) {
            h1set.children = [element]
            h2set = element
          } else {
            if (element.level > h2set.level) {
              if (h3set === null) {
                h2set.children = [element]
                h3set = element
              } else {
                // h3set = null
                if (element.level > h3set.level) {
                  if (h4set === null) {
                    h3set.children = [element]
                    h4set = element
                  } else {
                    // h4set = null
                    if (element.level > h4set.level) {
                      // 最多4层吧
                      console.log('最多4层')
                    } else {
                      h3set.children.push(element)
                      h4set = element
                    }
                  }
                } else {
                  h2set.children.push(element)
                  h3set = element
                  h4set = null
                }
              }
            } else {
              // console.log(h1set)
              h1set.children.push(element)
              h2set = element
              h3set = null
              h4set = null
            }
          }
        }
      }
      if (index === length - 1) {
        treelist.push(h1set)
      }
    })
    this.$emit('tocinit', treelist)
  }
}
</script>

<style lang="scss">
@import "github-markdown-css/github-markdown.css";
.article-detail {
  padding: 10px 0;
  .article-title {
    font-size: 18px;
    line-height: 30px;
    color: #000000;
    padding: 10px 0;
  }
  .extinfo {
    color: #444444;
    padding-top: 5px;
    font-size: 13px;

    dt {
      float: left;
    }
    dd {
      float: right;
      margin-right: 40px;
    }
    .tag{
      cursor: pointer
    }
  }
  .article-content {
    padding: 30px 0;
    clear: both;
  }
}

</style>

