<template>
  <div class="default-header">
    <div class="container">
      <div class="logo">
        <span class="logo-icon">
          <a href="/"><img src="../../../assets/logo.jpg" /></a>
        </span>
        <span class="desc">致力做一个有理想的码农</span>
      </div>
      <div class="header-right">
        <div class="topnav">
          <top-nav />
        </div>
        <el-dropdown :trigger="trigger" @command="handleCommand">
          <div class="user">
            <i v-if="$store.state.user.userinfo.avatar" class="avatar"
              ><img :src="$store.state.user.userinfo.avatar"
            /></i>
            <i
              v-else
              class="avatar icon iconfont icon-people"
              style="font-size: 20px"
            />
          </div>
          <el-dropdown-menu
            v-if="$store.state.user.userinfo.nickname"
            slot="dropdown"
          >
            <el-dropdown-item command="logout"> 注销 </el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else slot="dropdown">
            <el-dropdown-item command="login"> 登录 </el-dropdown-item>
            <el-dropdown-item command="register"> 注册 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="line" />
    <el-dialog
      :width="dialogWidth"
      :title="dialogLoginVisible ? '登录' : '注册'"
      :visible.sync="$store.state.user.showLogin"
      :close-on-click-modal="false"
      :before-close="handleDialogClose"
    >
      <div style="margin-top: 10px">
        <login-form
          v-if="dialogLoginVisible"
          :goto-register="gotoRegister"
          :login-callback="loginCallback"
        />
        <register-form
          v-if="dialogRegisterVisible"
          :goto-login="gotoLogin"
          :register-callback="registerCallback"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import axios from 'axios'
import TopNav from './nav'
import LoginForm from '@/components/user/loginForm.vue'
import RegisterForm from '@/components/user/registerForm'
export default {
  components: {
    TopNav,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      trigger: 'click',
      dialogLoginVisible: true,
      dialogRegisterVisible: false,
      dialogWidth: '320px',
    }
  },
  computed: {
    // 计算属性的 getter
    showLoginRegister() {
      // `this` 指向 vm 实例
      return this.dialogLoginVisible || this.dialogRegisterVisible
    },
  },
  beforeMount() {
    if (!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
      this.trigger = 'hover'
    }
  },
  mounted() {
    // const clientWidth = document.body.clientWidth
    // if (clientWidth < 480) {
    //   this.dialogWidth = Math.max(320, clientWidth * 0.8) + 'px'
    // } else {
    //   this.dialogWidth = Math.min(400, clientWidth * 0.8) + 'px'
    // }
  },
  methods: {
    loginCallback({ status, data }) {
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
          })
          window.location.reload(true)
        } else {
          this.$message({ showClose: true, message: data.msg, type: 'error' })
        }
      } else {
        this.$message({ showClose: true, message: '服务器出错', type: 'error' })
      }
    },
    gotoRegister() {
      // window.location = '/user/register'
      this.dialogRegisterVisible = true
      this.dialogLoginVisible = false
      this.$store.commit('user/setShowLogin', true)
    },
    registerCallback({ status, data }) {
      if (status === 200) {
        if (data && data.code === 0) {
          this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success',
          })
          window.location.reload(true)
        } else {
          this.$message({ showClose: true, message: data.msg, type: 'error' })
        }
      } else {
        this.$message({ showClose: true, message: '服务器出错', type: 'error' })
      }
    },
    gotoLogin() {
      this.dialogRegisterVisible = false
      this.dialogLoginVisible = true
      this.$store.commit('user/setShowLogin', true)
    },
    handleDialogClose() {
      this.dialogRegisterVisible = false
      this.dialogLoginVisible = true
      this.$store.commit('user/setShowLogin', false)
    },
    handleCommand(command) {
      // console.log(command)
      if (command === 'register') {
        this.dialogRegisterVisible = true
        this.dialogLoginVisible = false
        this.$store.commit('user/setShowLogin', true)
      } else if (command === 'login') {
        this.dialogLoginVisible = true
        this.dialogRegisterVisible = false
        this.$store.commit('user/setShowLogin', true)
      } else if (command === 'logout') {
        this.$axios.$get('/api/user/exit').then(() => {
          window.location.reload(true)
        })
        // this.$store.commit('user/setShowLogin', true)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/config.scss';

.default-header {
  // height: 70px;
  overflow: hidden;
  margin-bottom: 10px;
  padding: 10px 0;
  .container {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    @media screen and (max-width: 540px) {
      justify-content: center;
    }
    .logo {
      // float left
      height: 100%;
      display: flex;
      align-items: center;
      .logo-icon {
        height: 30px;
        width: 30px;
        display: inline-block;
        @media screen and (max-width: 540px) {
          margin-right: 8px;
          height: 28px;
          width: 28px;
        }
        @media screen and (max-width: 370px) {
          display: none;
        }
        img {
          height: 100%;
          width: auto;
          border-radius: 5px;
        }
      }
      .desc {
        color: #888888;
        padding: 0 10px;
        font-size: 16px;
        @media screen and (max-width: 540px) {
          display: none;
        }
      }
    }
    .header-right {
      display: flex;
      align-items: center;

      .topnav {
      }
      .user {
        margin-left: 8px;
        height: 34px;
        width: 34px;
        display: block;
        .avatar {
          display: block;
          overflow: hidden;
          font-style: normal;
          width: 34px;
          height: 34px;
          line-height: 34px;
          border-radius: 34px;
          background-color: $mainColor;
          color: #ffffff;
          font-size: 10px;
          text-align: center;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .el-menu.el-menu--horizontal {
    border: none;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item {
    padding: 0 10px;

    @media screen and (max-width: 400px) {
      padding: 0 8px;
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid #efefef;
  }
  .el-dialog__body {
    padding: 10px 10px;
  }
}
</style>
