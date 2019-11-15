<template>
  <div class="navLeft">
    <div class="logo">
      <img src="../../assets/img/logo_admin.png" alt />
    </div>
    <el-menu background-color="#323745" text-color="#adafb5" active-text-color="#ffd04b" style="width:201px" router>
      <!-- 一级列表 -->
      <el-menu-item index="/">
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-submenu index="2">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/image">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 二级菜单 -->
      <el-submenu index="3">
        <template slot="title">粉丝管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 一级列表 -->
      <el-menu-item index="/account">
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.navLeft {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .logo {
    background-color: #2e2f32;
    padding: 15px;
    text-align: center;
    img {
      height: 30px;
    }
  }
}
</style>
