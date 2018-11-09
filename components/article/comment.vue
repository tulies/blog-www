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
      <div class="comments-list">

        <div class="comments-item" :data-id="root.id" v-for="root in comments.list" :key="root.id">
          <div class="pull-left">
              <a target="_blank" href="/u/chakhsu"><img class="avatar-32 " src="https://avatar-static.segmentfault.com/159/356/1593567914-586917341dc42_big64" alt=""></a>
          </div>
          <div class="comments-content">
            <div class="comment-trigger">
                <div class="pull-right comment-option">
                    <a class="hide" href="javascript:;"><span class="ml10 comment-edit-btn"><span class="iconfont icon-brush_fill" aria-hidden="true"></span></span>
                    </a>
                    <a href="#911" class="ml10" data-toggle="modal" data-target="#911" data-action="report" data-action-text="举报" data-module="comment" data-id="1050000016778191" data-typetext="评论" data-placement="top" title="举报">
                      <span class="iconfont icon-flag_fill" aria-hidden="true"></span>
                    </a>
                    <a class="hide" href="javascript:;"><span class="ml10 comment-delete-btn"><span class="iconfont icon-trash_fill" aria-hidden="true"></span></span>
                    </a>
                </div>
                <strong><a target="_blank" href="/u/chakhsu">{{root.username}}</a></strong>
                <span class="comments-isAuthor hide"></span> <span>  ·  {{root.create_time}}</span>
            </div>
            <div class="fmt mb10" v-html="root.content"></div>
            <p class="comment-ops not-reply">
                <span class="comments-zan ">
                    <i class="iconfont icon-praise_fill" aria-hidden="true"></i>
                    <span class="comments-zan-text">已赞</span>
                    <span class="comments-zan-value">{{root.support_count}}</span>
                </span>
                <span class="ml15 comments-reply-btn">回复</span>
            </p>
            <div class="reply-list" v-if="root.replyList && root.replyList.total>0">
              <div class="reply-item" :data-id="reply.id" v-for="reply in root.replyList.list" :key="reply.id">
                  <span class="pull-left comment-ops" style="position:absolute;">
                      <span class="mr20 comments-zan">
                          <span class="comments-zan-value comment-showhide islike0-10">{{reply.support_count}}</span>
                          <i class="iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
                      </span>
                  </span>

                  <div class="reply-content-block">
                      <div class="reply-content" v-html="reply.content"></div>
                      <div class="comment-func inline-block">
                          <span class="pull-right commentTools ml15">
                              <a href="javascript:void(0);" class="comment-reply-btn comments-reply-user-btn" :data-username="reply.username" :data-userid="reply.userid">
                                  <span class="iconfont icon-message_fill" aria-hidden="true"></span>
                              </a>
                              <a href="#911" class="ml10" data-toggle="modal" data-target="#911" data-module="comment" data-id="1050000016784080" data-action="report" data-typetext="评论" data-placement="top" title="举报">
                                  <span class="iconfont icon-flag_fill" aria-hidden="true"></span>
                              </a>
                          </span>
                          <span class="comment-meta inline-block">
                              <span> — </span>
                              <a target="_blank" href="/u/aoyangyudakong">
                                  <strong>{{reply.username}}</strong>
                              </a>
                              <span class="comments-isAuthor ">
                                  作者
                              </span>
                              <span class="text-muted-plus">  · {{reply.create_time}}</span>
                          </span>
                      </div>
                  </div>
              </div>
              <div class="reply-item reply-item--ops">
                  <a class="reply-inner-btn" href="javascript:;">添加回复</a>
                  <span class="reply-more"><span class="text-muted-plus-plus mr5 ml5">|</span>
                    <a class="reply-more-btn" href="javascript:;">显示更多</a>
                  </span>
              </div>
              <form class="reply-form" action="/api/comment/1050000016778191/reply">
                <!-- <button type="button" class="btn btn-default pull-right reply-btn">添加回复</button>
                <button class="hide" type="button" ></button> -->
                <el-button size="small" class="pull-right reply-btn">添加回复</el-button>
                <div class="form-group">
                  <el-input
                    class="reply-text"
                    type="textarea"
                    autosize
                    placeholder="文明社会，理性评论"
                  >
                  </el-input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="comments-loading hide">载入中...</div>
      <div class="comments-more hide"><a href="javascript:;">显示更多评论</a></div>
      <div class="comments-box" id="goToReplyEditor">
        <div class="pull-left">
          <img class="avatar-32 " src="https://avatar-static.segmentfault.com/159/356/1593567914-586917341dc42_big64" alt="">
        </div>
        <div class="comments-box-content">
          <el-form
            ref="rootForm"
            :model="rootForm"
            :rules="rules"
            label-width="80px"
            label-position="top"
            size="medium"
            >
          <!-- <form action="/api/article/1190000016756466/comments/add"> -->
            <div class="form-group mb0">
              <el-form-item prop="content">
                <el-input
                  @focus="focusCommetInput"
                  v-model="rootForm.content"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="文明社会，理性评论">
                </el-input>
              </el-form-item>
              <div class="mt15 text-right">
                <el-button type="primary" @click="onSubmit('rootForm')" size="small">发布评论</el-button>
              </div>
            </div>
          <!-- </form> -->
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
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
      rootForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '评论内容不能为空' },
          { min: 3, max: 200, message: '评论的字数过少，请详细撰写', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    focusCommetInput () {
      // 先判断是否登录
      if (this.$store.state.user.userinfo.uid === 0) {
        this.$store.commit('user/setShowLogin', true)
      }
    },
    onSubmit (formName) {
      const self = this
      console.log(self.$store.state.user.userinfo)

      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        console.log(formdata)
        axios.post('/api/comment/addReplied', {
          tid: self.tid,
          content: '哈哈哈哈'
        }).then(({ status, data }) => {
          console.log({ status, data })
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/article/comment.scss';
</style>
