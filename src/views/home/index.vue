<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside></el-aside>
    <!-- 右侧模块 -->
    <el-container>
      <el-header></el-header>
      <el-main>
        <!-- 二级路由容器 -->

        <router-view>main</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftNav from './left-Nav'
import Header from './header'
export default {
  components: {
    'el-aside': leftNav,
    'el-header': Header
  }
}
</script>

<style lang='less' scoped>
</style>
