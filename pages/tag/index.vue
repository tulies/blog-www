<template>
  <div class="default-page-container">
    <section class="default-page-main">
      <main-breadcrumb v-if="breadcrumb.length > 0" :breadcrumb="breadcrumb" />
      <h2 class="page-title">常用标签</h2>
      <div class="tags-page">
        <div class="tags-row">
          <div v-for="group in list" :key="group.title" class="tags-col">
            <dl class="tag-list">
              <dt class="title">
                {{ group.title }}
              </dt>
              <dd v-for="tag in group.tags" :key="tag.name">
                <a :href="createTagUrl(tag.name)" class="article-tag">{{
                  tag.name
                }}</a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
    <aside class="default-page-aside">
      <!-- <aside-nav/> -->
      <aside-article-rec title="热门文章" :list="$store.state.article.hotrec" />
      <div style="padding: 15px 0 0 0">
        <a href="https://s.click.taobao.com/Kb3GbKw"
          ><img
            src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg"
            style="width: 100%; border-radius: 4px"
        /></a>
      </div>
      <aside-article-rec
        title="最新文章"
        :list="$store.state.article.newrec"
        style="margin-top: 15px"
      />
    </aside>
  </div>
</template>

<script>
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import CreateUrl from '@/util/createUrl'

export default {
  components: {
    MainBreadcrumb,
    AsideArticleRec,
  },
  middleware: ['hotArticleRec', 'newArticleRec'],
  asyncData(ctx) {
    let state = {
      breadcrumb: [],
    }

    // 获取面包屑导航--- 根据分类节点id获取父亲节点
    const breadcrumb = [
      {
        id: 1,
        name: '标签',
        url: '/tag',
      },
    ]
    state = { ...state, breadcrumb }
    return state
  },
  data() {
    return {
      list: [
        {
          title: '前端开发',
          tags: [
            { name: 'html' },
            { name: 'css' },
            { name: 'javascript' },
            { name: 'webpack' },
            { name: 'vue' },
            { name: 'angular' },
            { name: 'reactjs' },
          ],
        },
        {
          title: '开发语言',
          tags: [
            { name: 'java' },
            { name: 'php' },
            { name: 'javascript' },
            { name: 'nodejs' },
            { name: 'python' },
          ],
        },
        {
          title: 'java开发',
          tags: [
            { name: 'java' },
            { name: 'springboot' },
            { name: 'mybatis' },
            { name: 'tomcat' },
            { name: 'jpa' },
            { name: '注解' },
            { name: '多线程' },
          ],
        },
        {
          title: '数据库',
          tags: [
            { name: 'mysql' },
            { name: '数据库' },
            { name: 'redis' },
            { name: 'mongodb' },
            { name: 'sqlite' },
          ],
        },
      ],
    }
  },
  methods: {
    createTagUrl(tag) {
      return CreateUrl.tag(tag)
    },
  },
}
</script>

<style scoped lang="scss">
.page-title {
  padding: 20px 0 0 0;
  font-weight: bold;
}
.tags-page {
  margin-left: -7px;
  margin-right: -7px;
  .tags-row {
    display: flex;
    flex-wrap: wrap;
    .tags-col {
      flex-basis: 100%;
    }
  }
  .tag-list {
    padding: 20px 0 10px 0;
    margin: 0 7px;
    dt {
      line-height: 34px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      // font-weight: bold;
      margin-bottom: 10px;
    }
    dd {
      display: inline-block;
      margin: 5px 5px 0 0;
    }
  }
  .article-tag {
    font-size: 13px;
    height: 22px;
    line-height: 22px;
    padding: 0 6px;
  }
}
</style>
