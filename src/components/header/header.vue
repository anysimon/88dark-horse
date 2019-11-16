<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12">
        <i class="el-icon-s-unfold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="8" style="position: relative">
        <div class="grid-content bg-purple-light">
          <!-- 搜索框 -->
          <el-input
            v-model="input"
            prefix-icon="el-icon-search"
            placeholder="请输入搜索的文章内容"
            style="width:180px"
            size="small"
          ></el-input>
          <!-- 消息文字提示 -->
          <el-tooltip class="item" effect="dark" :content="userInfo.intro" placement="bottom">
            <el-button size="small" style="font-size:16px;border:0;background-color:#fff">消息</el-button>
          </el-tooltip>
          <!-- 头像 -->
          <!-- <img src="../../assets/img/avatar.jpg" alt class="userPic" /> -->
          <img :src="userInfo.photo" alt class="userPic" />
          <!-- 用户名 -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{userInfo.name}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <!-- <template><el-divider style="margin:0"></el-divider></template> -->
              <!-- 给组件注册事件需要修饰符 .native -->
              <el-dropdown-item @click.native='logOff'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      userInfo: {}
    }
  },
  created () {
    this.getUserinfo()
  },

  methods: {
    getUserinfo () {
      const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'get',
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` } // 请求参数
      }).then(res => {
        // console.log(res)
        this.userInfo = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 退出功能  element-ui MessageBox 弹框
    logOff () {
      this.$confirm('确定退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        window.localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.el-row {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  background-color: #fff;
  .el-icon-s-unfold {
    font-size: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .userPic {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
  }
}
</style>
