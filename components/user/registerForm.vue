<template>
  <div class="form-user-sign">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      label-position="top"
      size="large"
    >
      <el-form-item prop="nickname">
        <el-input
          v-model="registerForm.nickname"
          placeholder="真实姓名或常用名称"
        />
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" placeholder="您的邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="不少于6位的密码"
        />
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="registerForm.code"
          type="password"
          placeholder="请输入验证码"
        >
          <el-button slot="append" @click="sendMsg">
            {{ verifyBtnName }}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submitBtn"
          style="width: 100%"
          @click="onSubmit('registerForm')"
        >
          注册
        </el-button>
      </el-form-item>
      <!-- <div class="text-muted text-center more-login-area">
        <span class="more-login-words">更多登录方式</span>
    </div>
    <div class="widget-login mb15 text-center">
      <a href="/user/oauth/weixin" ><span class="icon-sn-weixin"></span></a>
      <a href="/user/oauth/qq" ><span class="icon-sn-qq"></span></a>
      <a href="/user/oauth/weibo" ><span class="icon-sn-sinaweibo"></span></a>
    </div> -->
      <el-form-item>
        <el-button style="width: 100%" @click="gotoLogin">
          已有账号登录
        </el-button>
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
      type: Function,
      default: () => {},
    },
    gotoLogin: {
      type: Function,
      default: () => {
        window.location = '/user/login'
      },
    },
  },
  data() {
    return {
      verifyBtnName: '发送验证码',
      registerForm: {
        nickname: '',
        username: '',
        password: '',
        code: '',
      },
      rules: {
        nickname: [
          { required: true, message: '请输入你的名字', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入您的邮箱', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
        ],
        code: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    sendMsg() {
      const self = this
      if (self.timerid) {
        console.log(223232)
        return false
      }
      this.$refs.registerForm.validateField('username', (valid) => {
        if (!valid) {
          axios
            .post('/api/user/verify', {
              username: self.registerForm.username,
            })
            .then(({ status, data }) => {
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
                  type: 'success',
                })
              } else {
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error',
                })
              }
            })
        }
      })
    },
    onSubmit(formName) {
      const self = this
      this.$refs[formName].validate((valid, formdata) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        axios
          .post('/api/user/register', {
            nickname: self.registerForm.nickname,
            username: self.registerForm.username,
            password: self.registerForm.password,
            code: self.registerForm.code,
          })
          .then(({ status, data }) => {
            self.registerCallback({ status, data })
          })
      })
    },
  },
}
</script>
