<template>
  <div class="comments-item" :data-id="reply.id">
    <div class="pull-left">
      <a target="_blank" href="###"
        ><img class="avatar-32" :src="`/stc/avatar/${reply.userid}`" alt=""
      /></a>
    </div>
    <div class="comments-content">
      <div class="comment-trigger">
        <div class="pull-right comment-option">
          <a class="hide" href="javascript:;"
            ><span class="ml10 comment-edit-btn"
              ><span class="iconfont icon-brush_fill" aria-hidden="true"
            /></span>
          </a>
          <!-- <a href="#911" class="hide ml10 report" title="举报">
              <span class="iconfont icon-flag_fill" aria-hidden="true"></span>
            </a> -->
          <a class="hide" href="javascript:;"
            ><span class="ml10 comment-delete-btn"
              ><span class="iconfont icon-trash_fill" aria-hidden="true"
            /></span>
          </a>
        </div>
        <strong
          ><a target="_blank" href="###">{{ reply.username }}</a></strong
        >

        <span v-if="reply.is_author" class="comments-isAuthor">作者</span>
        <span> · {{ reply.create_time }}</span>
      </div>
      <div
        class="fmt mb10 markdown-body"
        v-html="markedContent(reply.content)"
      />
      <p class="comment-ops not-reply">
        <span
          class="comments-zan"
          :class="{ 'comments-zan--active': reply.is_support }"
          @click="handleZan"
        >
          <i
            class="comments-zan-icon iconfont icon-praise_fill"
            aria-hidden="true"
          />
          <span class="comments-zan-text">{{
            reply.is_support ? '已赞' : '赞'
          }}</span>
          <span v-if="reply.support_count > 0" class="comments-zan-value"
            >+{{ reply.support_count }}</span
          >
        </span>
        <span class="ml15 comments-reply-btn" @click="gotoReply">回复</span>
      </p>
      <div class="reply-list">
        <template v-if="reply.replyList && reply.replyList.total > 0">
          <child-reply
            v-for="childreply in reply.replyList.list"
            :key="childreply.id"
            :reply="childreply"
            :at-reply="gotoAtReply"
          />
        </template>
        <div
          v-if="!showReplyForm && reply.replyList && reply.replyList.total > 0"
          class="reply-item reply-item--ops"
        >
          <a class="reply-inner-btn" href="javascript:;" @click="gotoReply"
            >添加回复</a
          >
          <span v-if="showMore" class="reply-more"
            ><span class="text-muted-plus-plus mr5 ml5">|</span>
            <a class="reply-more-btn" href="javascript:;" @click="loadmore"
              >显示更多</a
            >
          </span>
        </div>
        <el-form
          v-else-if="showReplyForm"
          ref="replyForm"
          class="reply-form"
          :model="replyForm"
          :rules="rules"
          label-width="80px"
          label-position="top"
          size="small"
        >
          <el-button
            size="small"
            class="pull-right reply-btn"
            @click="onSubmitReply('replyForm')"
          >
            添加回复
          </el-button>
          <div class="form-group">
            <el-form-item prop="content">
              <el-input
                v-model="replyForm.content"
                class="reply-text"
                type="textarea"
                autosize
                :placeholder="placeholder"
                @focus="focusCommetInput"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { marked } from 'marked'
import ChildReply from './childReply'
export default {
  components: {
    ChildReply,
  },
  props: {
    reply: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      replyObj: {},
      showReplyForm: false,
      placeholder: '文明社会，理性评论',
      replyForm: {
        content: '',
      },
      rules: {
        content: [
          { required: true, message: '评论内容不能为空', trigger: 'change' },
          { max: 200, message: '最多评论字数1000', trigger: 'no' },
        ],
      },
    }
  },
  computed: {
    showops() {
      return (
        !this.showReplyForm &&
        this.reply.replyList &&
        this.reply.replyList.total > 0
      )
    },
    showMore() {
      return (
        this.reply.replyList.total > this.reply.replyList.list.length &&
        !this.showLoading
      )
    },
  },
  methods: {
    focusCommetInput(event) {
      // 先判断是否登录
      if (this.$store.state.user.userinfo.uid === 0) {
        this.$store.commit('user/setShowLogin', true)
        event.preventDefault()
        event.stopPropagation()
        event.target.blur()
      }
    },
    onSubmitReply(formName) {
      const self = this
      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        axios
          .post('/api/comment/addChildReplied', {
            parentid: self.replyObj.id,
            content: self.replyForm.content,
          })
          .then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              // this.$alert('评论发送成功', '信息提示', {
              //   confirmButtonText: '确定'
              // })
              if (this.reply.replyList && this.reply.replyList.list) {
                this.reply.replyList.list.push(data.data)
              } else {
                this.reply.replyList = {
                  total: 1,
                  page: 0,
                  size: 5,
                  list: [data.data],
                }
              }
              // 通知外部 增加评论数
              this.$emit('on-reply-success')
              this.$refs[formName].resetFields()
              // this.replyForm.content = ''
            } else {
              this.$alert(data.msg, '信息提示', {
                confirmButtonText: '确定',
              })
            }
          })
          .catch(() => {
            this.$alert('系统异常，请稍后再试', '错误提示', {
              confirmButtonText: '确定',
            })
          })
      })
    },
    // 回复主评论
    gotoReply() {
      this.showReplyForm = true
      this.replyObj = this.reply
      this.placeholder = '文明社会，理性评论'
    },
    // 回复子评论
    gotoAtReply(parent) {
      this.showReplyForm = true
      this.replyObj = parent
      this.placeholder = `@${this.replyObj.username}   文明社会，理性评论`
    },
    handleZan() {
      console.log('👍操作')
      // 先判断是否登录
      if (this.$store.state.user.userinfo.uid === 0) {
        this.$store.commit('user/setShowLogin', true)
      }
      if (this.reply.is_support) {
        axios
          .get(`/api/comment/unsupport/${this.reply.id}`)
          .then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              this.reply.support_count--
              this.reply.is_support = false
            }
          })
      } else {
        axios
          .get(`/api/comment/support/${this.reply.id}`)
          .then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              this.reply.support_count++
              this.reply.is_support = true
            }
          })
      }
    },
    markedContent(content) {
      marked.setOptions({ breaks: true })
      return marked(content)
    },
    async loadmore() {
      const self = this
      const page = this.reply.replyList.page || 0
      const size = this.reply.replyList.size || 5
      if (this.showLoading) {
        return false
      }
      this.showLoading = true
      // 查询评论列表
      const { status: status3, data: data3 } = await axios.get(
        '/api/comment/getChildReplieds',
        {
          params: {
            tid: self.tid,
            rootid: this.reply.id,
            page: page + 1,
            size,
          },
        }
      )

      this.showLoading = false
      if (status3 === 200 && data3.code === 0) {
        const list = this.reply.replyList.list || []
        list.push.apply(list, data3.data.list)
        this.reply.replyList.total = data3.data.total
        this.reply.replyList.page = data3.data.page
        this.reply.replyList.size = data3.data.size
        this.reply.replyList.list = list
      }
    },
  },
}
</script>
