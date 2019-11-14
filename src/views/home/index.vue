<template>
  <el-container>
    <!-- 左侧导航 -->
    <el-aside></el-aside>
    <!-- 右侧模块 -->
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 二级路由容器 -->
        main
        <router-view>main</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftNav from './left-Nav'
export default {
  components: {
    'el-aside': leftNav
  }
}
</script>

<style lang='less' scoped>
</style>
