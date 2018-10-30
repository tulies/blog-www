<template>
  <div class="article-comment">
    <dl class="titlebar">
      <dt>评论</dt>
      <dd>
        <el-radio-group  v-model="defaultSort" size="mini">
          <el-radio-button label="默认排序"></el-radio-button>
          <el-radio-button label="时间排序"></el-radio-button>
        </el-radio-group>
      </dd>
    </dl>
    <div class="comments-container">
      <div class="comments-list">
        <div class="comments-item" data-id="1050000016778191">
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
                <strong><a target="_blank" href="/u/chakhsu">Chakhsu</a></strong>
                <span class="comments-isAuthor hide"></span> <span>  ·  6 天前</span>
            </div>
            <div class="fmt mb10"><p>Node.js v10 的 新功能 Worker Threads 也是不错的。<br><a href="https://nodejs.org/dist/latest-v10.x/docs/api/worker_threads.html" rel="nofollow noreferrer">https://nodejs.org/dist/lates...</a></p></div>
              <!-- <form action="/api/comment/1050000016778191/edit">
                  <div class="form-group">
                      <textarea class="editTextarea mono form-control mb10 hidden" name="text" rows="1" style="height: 332px; overflow: hidden; overflow-wrap: break-word;">Node.js v10 的 新功能 Worker Threads 也是不错的。https://nodejs.org/dist/latest-v10.x/docs/api/worker_threads.html</textarea>
                  </div>
              </form> -->
            <p class="comment-ops not-reply">
                <span class="comments-zan ">
                    <i class="iconfont icon-praise_fill" aria-hidden="true"></i>
                    <span class="comments-zan-text">已赞</span>
                    <span class="comments-zan-value">1434</span>
                </span>
                <span class="ml15 comments-reply-btn">回复</span>
            </p>
            <div class="reply-list ">
              <div class="reply-item" data-id="1050000016784080">
                  <span class="pull-left comment-ops" style="position:absolute;">
                      <span class="mr20 comments-zan">
                          <span class="comments-zan-value comment-showhide islike0-10">
                              0
                          </span>
                          <i class="iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
                      </span>
                  </span>

                  <div class="reply-content-block">
                      <div class="reply-content"><p>看上去是 Node 版的 Worker，说不定有库可以同时兼容 Node 和 Web 的 Worker 语法。</p></div>
                      <div class="comment-func inline-block">
                          <span class="pull-right commentTools ml15">
                              <a href="javascript:void(0);" class="comment-reply-btn comments-reply-user-btn" data-username="黄子毅" data-userslug="aoyangyudakong">
                                  <span class="iconfont icon-message_fill" aria-hidden="true"></span>
                              </a>
                              <a href="#911" class="ml10" data-toggle="modal" data-target="#911" data-module="comment" data-id="1050000016784080" data-action="report" data-typetext="评论" data-placement="top" title="举报">
                                  <span class="iconfont icon-flag_fill" aria-hidden="true"></span>
                              </a>
                          </span>

                          <span class="comment-meta inline-block">
                              <span> — </span>
                              <a target="_blank" href="/u/aoyangyudakong">
                                  <strong>黄子毅</strong>
                              </a>
                              <span class="comments-isAuthor ">
                                  作者
                              </span>
                              <span class="text-muted-plus">  ·  5 天前</span>
                          </span>
                      </div>
                  </div>
              </div>
              <div class="reply-item" data-id="1050000016793383">
                <span class="pull-left comment-ops " style="position:absolute;">
                    <span class="mr20 comments-zan ">
                        <span class="comments-zan-value comment-showhide islike0-10">
                            0
                        </span>
                        <i class="iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
                    </span>
                </span>

                <div class="reply-content-block">
                    <div class="reply-content"><p><a href="/u/aoyangyudakong">@黄子毅</a> 感谢</p></div>
                    <div></div>
                    <div class="comment-func inline-block">
                        <span class="pull-right commentTools ml15">
                            <a href="javascript:void(0);" class="comment-reply-btn comments-reply-user-btn" data-username="leexiaoran" data-userslug="li1076629390" title="回复">
                              <span class="iconfont icon-message_fill flipx" aria-hidden="true"></span>
                            </a>
                            <a class="ml10" href="#" title="举报"><span class="iconfont icon-flag_fill" aria-hidden="true"></span></a>
                        </span>
                        <span class="comment-meta inline-block">
                          <span> — </span>
                          <a target="_blank" href="/u/li1076629390">
                              <strong>leexiaoran</strong>
                          </a>
                          <span class="comments-isAuthor hide"></span>
                          <span class="text-muted-plus">  ·  5 天前</span>
                        </span>
                    </div>
                </div>
              </div>
              <div class="reply-item reply-item--ops">
                  <a class="reply-inner-btn" href="javascript:;">添加回复</a>
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
        <div class="comments-item" data-id="1050000016778191">
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
                <strong><a target="_blank" href="/u/chakhsu">Chakhsu</a></strong>
                <span class="comments-isAuthor hide"></span> <span>  ·  6 天前</span>
            </div>
            <div class="fmt mb10"><p>Node.js v10 的 新功能 Worker Threads 也是不错的。<br><a href="https://nodejs.org/dist/latest-v10.x/docs/api/worker_threads.html" rel="nofollow noreferrer">https://nodejs.org/dist/lates...</a></p></div>
              <!-- <form action="/api/comment/1050000016778191/edit">
                  <div class="form-group">
                      <textarea class="editTextarea mono form-control mb10 hidden" name="text" rows="1" style="height: 332px; overflow: hidden; overflow-wrap: break-word;">Node.js v10 的 新功能 Worker Threads 也是不错的。https://nodejs.org/dist/latest-v10.x/docs/api/worker_threads.html</textarea>
                  </div>
              </form> -->
            <p class="comment-ops not-reply">
                <span class="comments-zan ">
                    <i class="iconfont icon-praise_fill" aria-hidden="true"></i>
                    <span class="comments-zan-text">已赞</span>
                    <span class="comments-zan-value">1434</span>
                </span>
                <span class="ml15 comments-reply-btn">回复</span>
            </p>
            <div class="reply-list ">
              <div class="reply-item" data-id="1050000016784080">
                  <span class="pull-left comment-ops" style="position:absolute;">
                      <span class="mr20 comments-zan">
                          <span class="comments-zan-value comment-showhide islike0-10">
                              0
                          </span>
                          <i class="iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
                      </span>
                  </span>

                  <div class="reply-content-block">
                      <div class="reply-content"><p>看上去是 Node 版的 Worker，说不定有库可以同时兼容 Node 和 Web 的 Worker 语法。</p></div>
                      <div class="comment-func inline-block">
                          <span class="pull-right commentTools ml15">
                              <a href="javascript:void(0);" class="comment-reply-btn comments-reply-user-btn" data-username="黄子毅" data-userslug="aoyangyudakong">
                                  <span class="iconfont icon-message_fill" aria-hidden="true"></span>
                              </a>
                              <a href="#911" class="ml10" data-toggle="modal" data-target="#911" data-module="comment" data-id="1050000016784080" data-action="report" data-typetext="评论" data-placement="top" title="举报">
                                  <span class="iconfont icon-flag_fill" aria-hidden="true"></span>
                              </a>
                          </span>

                          <span class="comment-meta inline-block">
                              <span> — </span>
                              <a target="_blank" href="/u/aoyangyudakong">
                                  <strong>黄子毅</strong>
                              </a>
                              <span class="comments-isAuthor ">
                                  作者
                              </span>
                              <span class="text-muted-plus">  ·  5 天前</span>
                          </span>
                      </div>
                  </div>
              </div>
              <div class="reply-item" data-id="1050000016793383">
                <span class="pull-left comment-ops " style="position:absolute;">
                    <span class="mr20 comments-zan ">
                        <span class="comments-zan-value comment-showhide islike0-10">
                            0
                        </span>
                        <i class="iconfont icon-praise_fill comment-showhide ml5" aria-hidden="true"></i>
                    </span>
                </span>

                <div class="reply-content-block">
                    <div class="reply-content"><p><a href="/u/aoyangyudakong">@黄子毅</a> 感谢</p></div>
                    <div></div>
                    <div class="comment-func inline-block">
                        <span class="pull-right commentTools ml15">
                            <a href="javascript:void(0);" class="comment-reply-btn comments-reply-user-btn" data-username="leexiaoran" data-userslug="li1076629390" title="回复">
                              <span class="iconfont icon-message_fill flipx" aria-hidden="true"></span>
                            </a>
                            <a class="ml10" href="#" title="举报"><span class="iconfont icon-flag_fill" aria-hidden="true"></span></a>
                        </span>
                        <span class="comment-meta inline-block">
                          <span> — </span>
                          <a target="_blank" href="/u/li1076629390">
                              <strong>leexiaoran</strong>
                          </a>
                          <span class="comments-isAuthor hide"></span>
                          <span class="text-muted-plus">  ·  5 天前</span>
                        </span>
                    </div>
                </div>
              </div>
              <div class="reply-item reply-item--ops">
                  <a class="reply-inner-btn" href="javascript:;">添加回复</a>
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
          <form action="/api/article/1190000016756466/comments/add">
            <div class="form-group mb0">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                placeholder="文明社会，理性评论">
              </el-input>
              <div class="mt15 text-right">
                <el-button type="primary"  size="small">发布评论</el-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultSort: '默认排序'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/article/comment.scss';
</style>
