<template>
<div class="reply-item" :data-id="reply.id" >
    <span class="pull-left comment-ops" style="position:absolute;">
        <span class="mr20 comments-zan" :class="{'comments-zan--active': reply.is_support}" @click="handleZan">
            <span class="comments-zan-value comment-showhide islike0-10">{{reply.support_count}}</span>
            <i class="comments-zan-icon iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
        </span>
    </span>

    <div class="reply-content-block">
        <div class="reply-content markdown-body" v-html="markedContent(reply.content)"></div>

        <div class="comment-func inline-block">
            <span class="pull-right commentTools ml15">
                <a href="javascript:void(0);" @click="atReply(reply)" class="comment-reply-btn comments-reply-user-btn" :data-username="reply.username" :data-userid="reply.userid">
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
                <span class="comments-isAuthor" v-if="reply.is_author">作者</span>
                <span class="text-muted-plus">  · {{reply.create_time}}</span>
            </span>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import marked from 'marked'

export default {
  props: {
    reply: {
      type: Object,
      default: () => {
        return null
      }
    },
    atReply: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  methods: {
    handleZan () {
      console.log('👍操作')
      if (this.reply.is_support) {
        axios.get(`/api/comment/unsupport/${this.reply.id}`).then(({ status, data }) => {
          if (status === 200 && data.code === 0) {
            this.reply.support_count--
            this.reply.is_support = false
          }
        })
      } else {
        axios.get(`/api/comment/support/${this.reply.id}`).then(({ status, data }) => {
          if (status === 200 && data.code === 0) {
            this.reply.support_count++
            this.reply.is_support = true
          }
        })
      }
    },
    markedContent (content) {
      return marked(content)
    }
  }
}
</script>
