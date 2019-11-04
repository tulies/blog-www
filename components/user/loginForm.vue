<template>
  <div class="form-user-sign">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      size="large"
    >
      <!-- label-width="80px" -->

      <!-- 手机号 或  11位手机号 或  -->
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入您的邮箱"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item style="margin-bottom: 10px;">
        <el-button
          type="primary"
          class="submitBtn"
          style="width:100%"
          @click="onSubmit('form')"
        >
          登录
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
      <el-form-item style="padding:10px 0;margin-bottom: 10px;">
        <el-button
          style="width:100%"
          @click="gotoRegister"
        >
          注册新账号
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    // 登录成功回调
    loginCallback: {
      type: Function,
      default: () => {}
    },
    gotoRegister: {
      type: Function,
      default: () => {
        window.location = '/user/register'
      }
    }
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入您的邮箱', trigger: 'blur' }
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
        axios.post('/api/user/login', {
          username: self.form.username,
          password: self.form.password
        }).then(({ status, data }) => {
          self.loginCallback({ status, data })
        })
      })
    }

  }
}
</script>
