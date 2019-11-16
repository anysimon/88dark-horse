<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside class="leftNav"></el-aside>
    <!-- 右侧模块 -->
    <el-container class="main">
      <el-header></el-header>
      <el-main>
        <!-- 二级路由容器 -->

        <router-view>main</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftNav from '../layout/left-Nav'
import Header from '@/components/header/header'
export default {
  components: {
    'el-aside': leftNav,
    'el-header': Header
  }
}
</script>

<style lang='less' scoped>
.el-container{
  background-color: #f2f3f5;
  .el-main{
    padding: 10px;
  }
  .leftNav{
    position: fixed;
    z-index: 1;
  }
  .main{
    margin-left: 200px;
  }
}
</style>
