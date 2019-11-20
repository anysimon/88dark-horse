<template>
  <div class="media">
    <el-card class="box-card media">
      <div slot="header" class="clearfix">
        <span>图片管理</span>
      </div>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div>
            <el-radio-group v-model="collect" size="small" @change="onCollect">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple-light">
            <el-upload
            class="upload-demo"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            name="image"
            >
              <el-button size="middle" type="primary">上传图片</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="4" v-for="item in images" :key="item.id">
          <div class="grid-content bg-purple action">
            <img :src="item.url" alt class="images" />
            <div class="icons">
              <i
                :class=" {
              'el-icon-star-off': !item.is_collected,
              'el-icon-star-on': item.is_collected
              }"
                @click="onCollected(item)"
              ></i>
              <i class="el-icon-delete-solid" @click="onDelete(item)"></i>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
const token = window.localStorage.getItem('token')
export default {
  name: 'MediaImages',
  data () {
    return {
      collect: '全部',
      images: [],
      headers: {
        Authorization: `Bearer ${token}`
      },
      files: {
        image: 'file'
      }
    }
  },
  methods: {
    loadImages (collect = false) {
      this.$axios({
        url: '/user/images',
        params: {
          collect
        }
      })
        .then(res => {
          // console.log(res)
          this.images = res.data.data.results
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 收藏图片素材
    onCollected (item) {
      this.$axios({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      })
        .then(res => {
          // console.log(res)
          item.is_collected = !item.is_collected
          // console.log(item.is_collected)
          if (this.collect === '收藏') {
            this.loadImages(true)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 收藏管理
    onCollect (value) {
      this.loadImages(value === '收藏')
    },
    // 使用上传组件  成功之后的回调函数
    uploadSuccess (response) {
      if (response.message === 'OK') {
        this.$message({
          type: 'success',
          message: '上传图片成功'
        })
        this.loadImages()
      }
    },
    // 使用上传组件  失败之后的回调函数
    uploadError (err) {
      console.log(err)
    },
    // 删除功能
    onDelete (item) {
      this.$confirm('此操作将永久删除图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用接口
        this.$axios({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        }).then(res => {
          if (this.collect === '收藏') {
            this.loadImages(true)
          } else {
            this.loadImages()
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.loadImages()
  }
}
</script>

<style lang='less' scoped>
.media {
  width: 1308px;
}
.action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.images {
  width: 150px;
  height: 126px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #eee;
}
.icons {
  width: 150px;
  font-size: 20px;
  text-align: center;
  background-color: #f4f5f6;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  .el-icon-delete-solid {
    margin-left: 40px;
  }
}
</style>
