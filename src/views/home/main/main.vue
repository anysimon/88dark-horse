<template>
  <div class="main">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../../assets/img/avatar.jpg" alt />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="a">
            <span>222</span>
            <span class="info">粉丝数</span>
          </span>
          <span class="a">
            <span>333</span>
            <span class="info">累计阅读量</span>
          </span>
          <span class="a">
            <span>444</span>
          <span class="info">累计评论数</span>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.main {
  // height: 100vh;
  background-color: #fff;
}
.bg-purple {
  display: flex;
}
// .el-divider {
//   height: 100%;
// }
.a{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #eee;
}
.info {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>
