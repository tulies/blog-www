<template>
<div>
  <div class="panel-header">
    <div class="desc">欢迎来到王嘉炀个人博客</div>
    <!-- <div class="logo"><img src="../../assets/logo.jpg" /></div> -->
  </div>
  <el-card class="panel-login">
    <div slot="header" class="clearfix">
      <span class="panel-title">登录</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">注册</el-button> -->
    </div>
    <login-form :gotoRegister="gotoRegister" :loginCallback="loginCallback"></login-form>
  </el-card>
</div>
</template>

<script>
import LoginForm from '@/components/user/loginForm.vue'
export default {
  layout: 'blank',
  components: {
    LoginForm
  },
  methods: {
    loginCallback ({ status, data }) {
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({ showClose: true, message: '登录成功', type: 'success' })
          setTimeout(() => {
            window.location.href = '/'
          }, 500)
        } else {
          this.$message({ showClose: true, message: data.msg, type: 'error' })
        }
      } else {
        this.$message({ showClose: true, message: '服务器出错', type: 'error' })
      }
    },
    gotoRegister () {
      window.location = '/user/register'
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-header{
  padding: 20px;
  text-align: center;
  line-height: 40px;
  .logo img{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    line-height: 30px;
    vertical-align: middle

  }
  .desc{
    padding: 10px 0;
    line-height: 30px;
    color: #888888;
    font-size: 18px;
  }
}
.panel-login{
  width: 400px;
  margin: 20px auto;
  .panel-title{
    font-size: 16px;
    font-weight: bold;
  }

}

</style>
