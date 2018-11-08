<template>
<div class="form-user-sign">
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    label-position="top"
    size="medium"
    >
    <el-form-item label="你的名字" prop="nickname">
      <el-input v-model="form.nickname" placeholder="真实姓名或常用名称"></el-input>
    </el-form-item>
    <el-form-item label="手机号 或 Email" prop="username">
      <el-input v-model="form.username" placeholder="11位手机号 或 Email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" placeholder="不少于6位的密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" class="submitBtn" style="width:100%">注册</el-button>
    </el-form-item>
    <div class="text-muted text-center more-login-area">
        <span class="more-login-words">更多登录方式</span>
    </div>
    <div class="widget-login mb15 text-center">
      <a href="/user/oauth/weixin" ><span class="icon-sn-weixin"></span></a>
      <a href="/user/oauth/qq" ><span class="icon-sn-qq"></span></a>
      <a href="/user/oauth/weibo" ><span class="icon-sn-sinaweibo"></span></a>
    </div>
    <el-form-item style="padding:20px 0;">
      <el-button  @click="gotoLogin" style="width:100%">已有账号登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'blank',
  props: {
    registerCallback: {
      type: Function
    },
    gotoLogin: {
      type: Function,
      default: () => {
        window.location = '/user/login'
      }
    }
  },
  data () {
    return {
      form: {
        nickname: '',
        username: '',
        password: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入你的名字', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入手机号或Email', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      const self = this
      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        axios.post('/api/user/register', {
          nickname: self.form.nickname,
          username: self.form.username,
          password: self.form.password
        }).then(({ status, data }) => {
          self.registerCallback({ status, data })
        })
      })
    }
  }
}
</script>
