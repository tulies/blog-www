
<template>
<div class="default-page-container">
  <section class="default-page-main">
    <main-breadcrumb :breadcrumb="breadcrumb" :mores="categoryChilds" v-if="breadcrumb.length>0"/>
    <article-list :list="list" :total="total" :pageSize="pageSize"/>
     <div class="article-pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </section>
  <aside class="default-page-aside">
    <!-- <aside-nav/> -->
    <aside-article-rec
      title="热门文章"
      :list="$store.state.article.hotrec"/>
    <div style="padding: 15px 0 0 0" ><a href="https://s.click.taobao.com/Kb3GbKw"><img src="http://tp.nty.tv189.com/h5/bl/adv-aliyun-463-224-2.jpg" style="width:100%;border-radius:4px"/></a></div>
    <aside-article-rec
      title="最新文章"
      :list="$store.state.article.newrec"
      style="margin-top: 15px;"/>
  </aside>
</div>
</template>

<script>
import MainBreadcrumb from '@/components/widgets/mainBreadcrumb'
import AsideNav from '@/components/widgets/asideNav'
import AsideArticleRec from '@/components//widgets/asideArticleRec'
import ArticleList from '@/components/articleList/index.vue'

export default {
  components: {
    ArticleList,
    MainBreadcrumb,
    AsideNav,
    AsideArticleRec
  },
  async asyncData (ctx) {
    const { id } = ctx.query
    let state = {
      id,
      list: [],
      total: 0,
      pageSize: 10,
      pageNum: 0,
      breadcrumb: [],
      categoryChilds: []
    }
    // 获取文章列表
    const { status, data } = await ctx.$axios.get(`/api/article/list`, {
      params: {
        page: 0,
        size: 10,
        categoryId: id
      }
    })
    if (status === 200 && data.code === 0) {
      state = {
        ...state,
        list: data.data.list,
        total: data.data.total,
        pageSize: data.data.size,
        pageNum: data.data.page + 1
      }
    }

    // 获取面包屑导航--- 根据分类节点id获取父亲节点
    const { status: status2, data: data2 } = await ctx.$axios.get(
      `/api/article/categoryUp/${id}`
    )
    const breadcrumb = []
    if (status2 === 200 && data2.code === 0) {
      breadcrumb.push({
        id: data2.data.id,
        name: data2.data.name,
        url: `/cate?id=${data2.data.id}`
      })
      // 因为我们最多分3层，所以我这里就简单点写了。
      if (data2.data.parent) {
        if (data2.data.parent.id !== 0) {
          breadcrumb.unshift({
            id: data2.data.parent.id,
            name: data2.data.parent.name,
            url: `/cate?id=${data2.data.parent.id}`
          })

          if (data2.data.parent.parent) {
            if (data2.data.parent.parent.id !== 0) {
              breadcrumb.unshift({
                id: data2.data.parent.parent.id,
                name: data2.data.parent.parent.name,
                url: `/cate?id=${data2.data.parent.parent.id}`
              })
            }
          }
        }
      }
      state = { ...state, breadcrumb }
    }

    // 右边的more导航
    const { status: status3, data: data3 } = await ctx.$axios.get(
      `/api/article/categoryChild/${id}`
    )
    if (status3 === 200 && data3.code === 0) {
      let categoryChilds = data3.data
        .sort((a, b) => {
          if (a.sort > b.sort) {
            return 1
          } else if (a.sort < b.sort) {
            return -1
          } else {
            return 0
          }
        })
        .map(v => ({
          name: v.name,
          url: `/cate?id=${v.id}`
        }))
      if (!categoryChilds || categoryChilds.length <= 0) {
        categoryChilds = [
          {
            name: '查看更多>>',
            url: '/'
          }
        ]
      }
      state = { ...state, categoryChilds }
    }

    return state
  },
  methods: {
    async handleCurrentChange (val) {
      const self = this

      const { status, data } = await self.$axios.get(`/api/article/list`, {
        params: {
          page: val - 1,
          size: self.pageSize,
          categoryId: self.id
        }
      })
      if (status === 200 && data.code === 0) {
        self.list = data.data.list
        self.total = data.data.total
        self.pageNum = data.data.page + 1
      }
    }
  },
  middleware: ['hotArticleRec', 'newArticleRec']
}
</script>

<style scoped lang="scss">
.article-pagination {
  padding: 10px 5px;
}
</style>
