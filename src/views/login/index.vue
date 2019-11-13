<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 头图 -->
      <div>
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:15px">
        <!-- 手机号 -->
        <el-form-item>
        <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
        <el-input v-model="loginForm.code" placeholder="请输入验证码" class="code-input"></el-input>
        <el-button plain class="code-send">发送验证码</el-button>
        </el-form-item>
        <!-- 同意协议 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.checked" style="float:left">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
         <el-button type="primary" style="width:100%">登录</el-button>
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
        checked: false
      }
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
    .code-input{
      width: 220px;
      float: left;
    }
    .code-send{
      float: right;
    }
  }
}
</style>
