<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号信息</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple box">
            <img :src="userInfo.photo" alt class="img" />
            <div>
              <el-button type="text" @click="dialogVisible = true">更换头像</el-button>
              <!-- 添加头像模块 -->
              <el-dialog title="上传头像" :visible.sync="dialogVisible" width="50%">
                <!-- 上传头像 -->
                <div>
                  <el-upload
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                    list-type="picture-card"
                    :http-request="onUpload"
                    ref="upload"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog>
                    <img width="100%"/>
                  </el-dialog>
                </div>
                <!-- 上传头像 -->
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="changeImg">确 定</el-button>
                </span>
              </el-dialog>
              <!-- /添加头像模块 -->
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <div v-show="edit">
              <div>{{ userInfo.name }}</div>
              <span class="userInfo">{{ userInfo.intro ? userInfo.intro : '这个人很懒,什么也没有留下。。。'}}</span>
            </div>
            <el-form ref="form" :model="userInfo" size="small" v-show="!edit">
              <el-form-item label="名称">
                <el-input v-model="userInfo.name" class="inp"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="userInfo.intro" class="inp" placeholder="请输入头条号简介"></el-input>
              </el-form-item>
              <el-form-item label size="small" style="margin-left: 40px">
                <el-button type="primary" @click="saveInfo">保存</el-button>
                <el-button @click="edit = true">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-link type="primary" :underline="false" @click="editInfo" v-show="edit">修改</el-link>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple box">账号信息</div>
        </el-col>
        <el-col :span="21">
          <div class="grid-content bg-purple-light">
            <span>头条号类型</span>
            <span class="user">个人</span>
          </div>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple box"></div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <span>头条号ID</span>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">{{ userInfo.id }}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple box">登录方式</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <span>绑定手机</span>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">{{ userInfo.mobile }}</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="3">
          <div class="grid-content bg-purple box">邮箱</div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <div v-show="editEmail">
              <span>{{ userInfo.email ? userInfo.email : '你连个邮箱都诶有，注册个什么劲。。。'}}</span>
            </div>
            <el-form ref="form" :model="userInfo" size="small" v-show="!editEmail">
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email" class="inp" style="margin-left: 118px"></el-input>
              </el-form-item>
              <el-form-item label size="small" style="margin-left: 160px">
                <el-button type="primary" @click="saveInfo">保存</el-button>
                <el-button @click="editEmail = true">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-link type="primary" :underline="false" @click="editUseremail">修改邮箱</el-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../../units/event-bus.js'
export default {
  name: 'accountIndex',
  data () {
    return {
      userInfo: {
        email: '',
        id: '',
        intro: null, // 简介
        mobile: '',
        name: '',
        photo: '../../../assets/img/avatar.jpg'
      },
      dialogVisible: false,
      dialogImageUrl: '',
      edit: true, // 修改name初始状态
      editEmail: true, // 修改email初始状态
      file: ''
    }
  },
  methods: {
    loadUserInfo () {
      this.$axios({
        url: '/user/profile'
      })
        .then(res => {
          this.userInfo = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 更换头像确定
    changeImg () {
      this.dialogVisible = false
      const formdata = new FormData()
      formdata.append('photo', this.file)
      this.$axios({
        method: 'PATCh',
        url: '/user/photo',
        data: formdata
      }).then(res => {
        // console.log(res)
        this.$message({
          message: '修改用户头像成功',
          type: 'success'
        })
        this.userInfo.photo = res.data.data.photo
        this.$refs.upload.clearFiles()
        // 监听事件
        eventBus.$emit('changeImg', this.userInfo)
      }).catch(err => {
        console.log(err)
      })
    },

    // 更换头像属性获取图片
    onUpload (config) {
      this.file = config.file
    },
    // 保存修改
    saveInfo () {
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.userInfo.name,
          intro: this.userInfo.intro
        }
      }).then(res => {
        this.edit = true
        this.editEmail = true
        this.$message({
          message: '修改用户信息成功',
          type: 'success'
        })
        eventBus.$emit('changeImg', this.userInfo)
        // console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error('修改信息失败')
      })
    },

    // 修改用户信息
    editInfo () {
      if (!this.editEmail) {
        this.$message({
          message: '请关闭正在编辑的内容',
          type: 'warning'
        })
      } else {
        this.edit = false
      }
    },

    // 修改用户邮箱
    editUseremail () {
      if (!this.edit) {
        this.$message({
          message: '请关闭正在编辑的内容',
          type: 'warning'
        })
      } else {
        this.editEmail = false
      }
    }

  },
  created () {
    this.loadUserInfo()
  }
}
</script>

<style lang="less" secoped>
.img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.box {
  margin-left: 35px;
}
.userInfo {
  font-size: 12px;
  color: #999;
}
.user {
  margin-left: 75px;
}
.el-dialog__wrapper {
  left: 125px !important;
}
.inp {
  width: 250px !important;
}
.email {
  margin-right: 20px !important;
}
</style>
