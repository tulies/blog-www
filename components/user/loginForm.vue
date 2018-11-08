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
    <el-form-item label="手机号 或 Email" prop="username">
      <el-input v-model="form.username" placeholder="11位手机号 或 Email"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" placeholder="不少于6位的密码" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')" class="submitBtn" style="width:100%">登录</el-button>
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
      <el-button  @click="gotoRegister" style="width:100%">注册新账号</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  props: {
    // 登录成功回调
    loginCallback: {
      type: Function
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
        self.$axios.post('/api/user/login', {
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


