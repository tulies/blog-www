<template>
<div class="form-user-sign">
  <el-form
    ref="registerForm"
    :model="registerForm"
    :rules="rules"
    label-width="80px"
    label-position="top"
    size="small"
z    >
    <el-form-item label="你的名字" prop="nickname">
      <el-input v-model="registerForm.nickname" placeholder="真实姓名或常用名称"></el-input>
    </el-form-item>
    <el-form-item label="手机号 或 Email" prop="username">
      <el-input v-model="registerForm.username" placeholder="11位手机号 或 Email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password" placeholder="不少于6位的密码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input type="password" v-model="registerForm.code" placeholder="请输入验证码">
            <el-button slot="append" @click="sendMsg">{{verifyBtnName}}</el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('registerForm')" class="submitBtn" style="width:100%">注册</el-button>
    </el-form-item>
    <!-- <div class="text-muted text-center more-login-area">
        <span class="more-login-words">更多登录方式</span>
    </div>
    <div class="widget-login mb15 text-center">
      <a href="/user/oauth/weixin" ><span class="icon-sn-weixin"></span></a>
      <a href="/user/oauth/qq" ><span class="icon-sn-qq"></span></a>
      <a href="/user/oauth/weibo" ><span class="icon-sn-sinaweibo"></span></a>
    </div> -->
    <el-form-item style="padding-top:10px;">
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
      verifyBtnName: '发送验证码',
      registerForm: {
        nickname: '',
        username: '',
        password: '',
        code: ''
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
        ],
        code: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendMsg () {
      const self = this
      if (self.timerid) {
        console.log(223232)
        return false
      }
      this.$refs['registerForm'].validateField('username', (valid) => {
        if (!valid) {
          axios.post('/api/user/verify', {
            username: self.registerForm.username
          }).then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              self.verifyBtnName = `${count--}秒后重新获取`
              self.timerid = setInterval(function () {
                self.verifyBtnName = `${count--}秒后重新获取`
                if (count === 0) {
                  self.verifyBtnName = '发送验证码'
                  clearInterval(self.timerid)
                  self.timerid = null
                }
              }, 1000)

              this.$message({
                showClose: true,
                message: data.msg,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error'
              })
            }
          })
        }
      })
    },
    onSubmit (formName) {
      const self = this
      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        axios.post('/api/user/register', {
          nickname: self.registerForm.nickname,
          username: self.registerForm.username,
          password: self.registerForm.password,
          code: self.registerForm.code
        }).then(({ status, data }) => {
          self.registerCallback({ status, data })
        })
      })
    }
  }
}
</script>
