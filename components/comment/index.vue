<template>
  <div class="article-comment">
    <dl class="titlebar">
      <dt>{{topic.replied_count?`${topic.replied_count}条评论`:'评论'}}</dt>
      <dd>
        <el-radio-group  v-model="defaultSort" size="mini" @change="sortChange">
          <el-radio-button label="default">默认排序</el-radio-button>
          <el-radio-button label="create">时间排序</el-radio-button>
        </el-radio-group>
      </dd>
    </dl>
    <div class="comments-container">
            <div class="comments-box" id="goToReplyEditor">
        <div class="pull-left">
          <img class="avatar-32 " src="https://avatar-static.segmentfault.com/159/356/1593567914-586917341dc42_big64" alt="">
        </div>
        <div class="comments-box-content">
          <el-form
            ref="replyForm"
            :model="replyForm"
            :rules="rules"
            label-width="80px"
            label-position="top"
            size="medium"
            >
          <!-- <form action="/api/article/1190000016756466/comments/add"> -->
            <div class="form-group mb0">
              <el-form-item prop="content" >
                <el-input
                  @focus="focusCommetInput"
                  v-model="replyForm.content"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="文明社会，理性评论">
                </el-input>
              </el-form-item>
              <div class="mt15 text-right">
                <el-button type="primary" @click="onReply('replyForm')" size="small">发布评论</el-button>
              </div>
            </div>
          <!-- </form> -->
          </el-form>
        </div>
      </div>
      <div class="comments-list">
        <root-reply v-for="reply in comments.list" :key="reply.id" :reply="reply" @on-reply-success="onReplySuccess"></root-reply>
      </div>
      <div class="comments-loading" v-if="showLoading">载入中...</div>
      <div class="comments-more" v-if="showMore"><a href="javascript:;" @click="loadmore">显示更多评论</a></div>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import RootReply from '@/components/comment/rootReply.vue'
export default {
  props: {
    topic: {
      type: Object,
      default: () => {
        return {
        }
      }
    },
    comments: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data () {
    return {
      showLoading: false,
      defaultSort: 'default',
      replyForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '评论内容不能为空', trigger: 'change' },
          { max: 200, message: '最多评论字数1000', trigger: 'no' }
        ]
      },
      childForm: {
        content: ''
      }
    }
  },
  components: {
    RootReply
  },
  methods: {
    focusCommetInput (event) {
      // 先判断是否登录
      if (this.$store.state.user.userinfo.uid === 0) {
        this.$store.commit('user/setShowLogin', true)
        event.preventDefault()
        event.stopPropagation()
        event.target.blur()
      }
    },
    onReply (formName) {
      const self = this
      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        axios.post('/api/comment/addRootReplied', {
          tid: self.topic.tid,
          content: self.replyForm.content
        }).then(({ status, data }) => {
          if (status === 200 && data.code === 0) {
            // this.$alert('评论发送成功', '信息提示', {
            //   confirmButtonText: '确定'
            // })
            if (this.comments.list) {
              // this.reply.replyList.list.unshift(data.data)
              this.comments.list.unshift(data.data)
            } else {
              this.comments = {
                total: 1,
                page: 0,
                size: 5,
                list: [data.data]
              }
            }
            // 增加评论数
            this.onReplySuccess()
            this.$refs[formName].resetFields()

            // this.replyForm.content = ''
          } else {
            this.$alert(data.msg, '信息提示', {
              confirmButtonText: '确定'
            })
          }
        }).catch(() => {
          this.$alert('系统异常，请稍后再试', '错误提示', {
            confirmButtonText: '确定'
          })
        })
      })
    },
    async loadmore () {
      const self = this
      const page = this.comments.page || 0
      const size = this.comments.size || 10
      if (this.showLoading) {
        return false
      }
      this.showLoading = true
      // 查询评论列表
      const { status: status3, data: data3 } = await axios.get(`/api/comment/getReplieds`, {
        params: {
          tid: self.topic.tid,
          page: page + 1,
          size,
          sort: self.sort
        }
      })
      this.showLoading = false
      if (status3 === 200 && data3.code === 0) {
        let list = this.comments.list || []
        list.push.apply(list, data3.data.list)
        this.comments.total = data3.data.total
        this.comments.page = data3.data.page
        this.comments.size = data3.data.size
        this.comments.list = list

        // this.comments = {
        //   total: data3.data.total,
        //   page: data3.data.page,
        //   size: data3.data.size,
        //   list
        // }
        // commit
        // ctx.store.commit('article/setComments', data3.data)
      }
    },
    async sortChange () {
      const self = this
      const page = 0
      const size = this.comments.size || 10
      if (this.showLoading) {
        return false
      }
      this.showLoading = true
      // 查询评论列表
      const { status: status3, data: data3 } = await axios.get(`/api/comment/getReplieds`, {
        params: {
          tid: self.topic.tid,
          page,
          size,
          sort: self.defaultSort
        }
      })
      this.showLoading = false
      if (status3 === 200 && data3.code === 0) {
        this.comments.total = data3.data.total
        this.comments.page = data3.data.page
        this.comments.size = data3.data.size
        this.comments.list = data3.data.list
      }
    },
    onReplySuccess () {
      this.topic.replied_count = this.topic.replied_count + 1
    }

  },
  computed: {
    showMore () {
      return (this.comments.total > this.comments.list.length) && !this.showLoading
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/article/comment.scss';
</style>
