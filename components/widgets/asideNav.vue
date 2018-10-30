<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
  </div>
  <el-row>
    <el-col :span="6" v-for="item in list" :key="item.id" class="item">
      <p><img :src="item.cover" /></p>
      <h3>{{item.title}}</h3>
    </el-col>
  </el-row>
</el-card>
</template>
<script>
import incoNav1 from '../../assets/img/ico_nav1.jpg'
import incoNav2 from '../../assets/img/ico_nav2.jpg'
import incoNav3 from '../../assets/img/ico_nav3.jpg'
import incoNav4 from '../../assets/img/ico_nav4.jpg'

export default {
  data () {
    return {
      title: '关注我们',
      list: [
        {
          id: '3993',
          title: '微信',
          cover: incoNav1
        },
        {
          id: '434',
          title: '微博',
          cover: incoNav2
        },
        {
          id: '656',
          title: '邮箱',
          cover: incoNav3
        },
        {
          id: '122',
          title: 'QQ',
          cover: incoNav4
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  .item {
    text-align: center;
    img {
      width: 50px;
    }
    h3{
      font-size: 14px;
      line-height: 24px;
    }

  }
}
</style>
