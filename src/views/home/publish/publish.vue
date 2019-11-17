<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <el-form ref="form" :model="PublishForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="PublishForm.title" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <template>
            <quill-editor v-model="PublishForm.content" ref="myQuillEditor" :options="{}"></quill-editor>
          </template>
        </el-form-item>
        <!-- <el-form-item label="封面">
          <el-radio-group v-model="PublishForm.cover.type">
            <el-radio label="1">单图</el-radio>
            <el-radio label="3">三图</el-radio>
            <el-radio label="0">无图</el-radio>
            <el-radio label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="频道">
          <el-select v-model="PublishForm.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-button type="success" @click="onSubmit(false)" style="margin-left:82px">发表</el-button>
      <el-button type="warning" @click="onSubmit(true)">存入草稿</el-button>
    </el-card>
  </div>
</template>

<script>
// 引入富文本组件
import { quillEditor } from 'vue-quill-editor'
// 引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  name: 'Publish',
  data () {
    return {
      PublishForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: [] // 获取频道
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios.get('/channels').then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 发表文章
    onSubmit (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: { draft }, // Query参数
        data: this.PublishForm
      }).then(res => {
        // console.log(res)
        this.$router.push('/article')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
</style>
