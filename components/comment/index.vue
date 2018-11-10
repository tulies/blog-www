<template>
  <div class="article-comment">
    <dl class="titlebar">
      <dt>评论 {{comments.list.length}}条评论</dt>
      <dd>
        <el-radio-group  v-model="defaultSort" size="mini">
          <el-radio-button label="默认排序"></el-radio-button>
          <el-radio-button label="时间排序"></el-radio-button>
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
        <root-reply v-for="reply in comments.list" :key="reply.id" :reply="reply"></root-reply>
      </div>
      <div class="comments-loading hide">载入中...</div>
      <div class="comments-more hide"><a href="javascript:;">显示更多评论</a></div>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import RootReply from '@/components/comment/rootReply.vue'
export default {
  props: {
    tid: {
      type: String
    },
    comments: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      defaultSort: '默认排序',
      replyForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '评论内容不能为空' },
          { min: 3, max: 200, message: '评论的字数过少，请详细撰写', trigger: 'blur' }
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
      console.log(event)
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
      console.log(self.$store.state.user.userinfo)

      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        console.log(formdata)
        axios.post('/api/comment/addRootReplied', {
          tid: self.tid,
          content: self.replyForm.content
        }).then(({ status, data }) => {
          console.log({ status, data })
          if (status === 200 && data.code === 0) {
            this.$alert('评论发送成功', '信息提示', {
              confirmButtonText: '确定'
            })
            this.comments.list.unshift(data.data)
            this.replyForm.content = ''
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
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/article/comment.scss';
</style>
