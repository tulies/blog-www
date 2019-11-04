<template>
  <div>
    <div class="panel-header">
      <div class="desc">
        欢迎来到王嘉炀个人博客
      </div>
    </div>
    <el-card class="panel-login">
      <div
        slot="header"
        class="clearfix"
      >
        <span class="panel-title">注册</span>
      </div>
      <register-form
        :goto-login="gotoLogin"
        :register-callback="registerCallback"
      />
    </el-card>
  </div>
</template>

<script>
import RegisterForm from '@/components/user/registerForm'
export default {
  layout: 'blank',
  components: {
    RegisterForm
  },
  methods: {
    // 注册结果回调
    registerCallback ({ status, data }) {
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({ showClose: true, message: '注册成功', type: 'success' })
          setTimeout(() => {
            window.location.href = '/user/login'
          }, 500)
        } else {
          this.$message({ showClose: true, message: data.msg, type: 'error' })
        }
      } else {
        this.$message({ showClose: true, message: '服务器出错', type: 'error' })
      }
    },
    gotoLogin () {
      window.location = '/user/login'
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

  .form-login{
    width: 300px;
    margin: 0 auto
  }
  .submitBtn{
    margin-top:10px;
  }

  .more-login-area {
    margin-top: 30px;
    margin-bottom: 25px;
    border-bottom: 1px solid #eee;
    color: #777;
    text-align:center;
    position: relative;
  }

  .more-login-area .more-login-words {
      position: absolute;
      left: calc(50% - 52px);
      top: -10px;
      padding: 0 10px;
      background: #fff;
      font-size: 14px;

  }
  .widget-login {
    text-align: center;
    [class*="icon-sn-"] {
        display: inline-block;
        // background-image: url(../../assets/img/login-other.png);
        background-repeat: no-repeat;
        width: 30px;
        height: 30px;
        vertical-align: middle;
        background-size: auto 73px;
        margin: 0 20px;
    }
    .icon-sn-weixin {
      background-position: -102px 0
    }
    .icon-sn-qq {
      background-position: -51px 0;
    }
    .icon-sn-sinaweibo {
      background-position: 0 0;
    }
  }

  .el-form-item{
    margin-bottom: 10px;
  }
  .el-form--label-top .el-form-item__label{
    padding-bottom: 0;
    font-weight: bold;
  }

}

</style>
