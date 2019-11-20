<template>
  <el-container>
    <!-- 左侧导航 -->
    <div style="width: 200px">
       <el-aside class="leftNav"></el-aside>
    </div>
    <!-- 右侧模块 -->
    <el-container>
      <el-header></el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view :key='$route.path'>main</router-view>
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

<style lang='less'>
.el-container{
  background-color: #f2f3f5;
  .el-main{
    padding: 10px;
  }
  .leftNav{
    position: fixed;
    z-index: 1;
  }
}
</style>
