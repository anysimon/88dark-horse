<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 头图 -->
      <div>
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:15px" :model="loginForm" :rules="rules" ref="loginForm">
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" class="code-input"></el-input>
          <el-button
            plain
            class="code-send"
            type="success"
            :disabled="disabled=!show"
            @click="send"
          >
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} s</span>
          </el-button>
        </el-form-item>
        <!-- 同意协议 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked" style="float:left">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="loginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: true
      },
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      time: null,
      timeCount: 10, // 倒计时时间
      rules: {
        // 验证手机号规则  required 为必填项 message 当不满足规则时的提示信息 trigger 触发事件 可省略
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '您输入的号码有误，请重新输入'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '您输入的验证码有误,请确认后输入' }
        ],
        // checked: [{ type: 'array', message: '请阅读协议后勾选', trigger: 'change' }]
        checked: [
          {
            validator: (rule, value, callback) => {
              // rule 为当前规则     value代表checked的值   callback 回调函数
              if (value) {
                callback()
              } else {
                callback(new Error('请阅读协议后勾选'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 定时器
    send () {
      if (!this.time) {
        this.count = this.timeCount
        this.show = false
        this.time = setInterval(() => {
          if (this.count > 0 && this.count <= this.timeCount) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.time)
            this.time = null
          }
        }, 1000)
      }
    },
    loginSubmit () {
      this.$refs.loginForm.validate(isSuccess => {
        if (isSuccess) {
          // console.log(isSuccess) // 校验成功返回true
          this.$axios
            .post('/authorizations', this.loginForm)
            .then(res => {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/')
            }).catch(res => {
              this.$message({
                message: '查无此号，请重新输入',
                type: 'error'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../assets/img/login_bg.jpg");
  background-size: cover;
  .login-card {
    width: 400px;
    height: 320px;
    text-align: center;
    img {
      height: 35px;
    }
    .code-input {
      width: 220px;
      float: left;
    }
    .code-send {
      float: right;
      width: 110px;
      color: #000;
    }
  }
}
</style>
