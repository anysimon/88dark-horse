<template>
  <div>
    <el-card class="box-card search">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- ---------------------- -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio label="">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <el-option label="开发者咨询" value="开发者咨询"></el-option>
            <el-option label="ios" value="ios"></el-option>
            <el-option label="c++" value="c++"></el-option>
            <el-option label="android" value="android"></el-option>
            <el-option label="css" value="css"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <template>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- ---------------------------------------------------------------渲染文章 -->
      <el-card class="box-card filterList">
      <div slot="header" class="clearfix">
        <span>共找到{{total_count}}条符合条件的内容</span>
      </div>
      <el-table :data="filterForm.results" style="width: 100%;text-align: center">
        <el-table-column prop="imges" label="封面" width="180">
          <template slot-scope="scope">
            <!-- secope.row 就是遍历项  相当于每一项 item -->
            <img width="50" :src="scope.row.cover.images[0]">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="220"></el-table-column>
        <el-table-column prop="articlesStatus" label="状态">
          <template slot-scope="scope">
            <el-tag
            :type='articlesStatus[scope.row.status].type' size="small">
            {{ articlesStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column prop="edit" label="操作" style="text-align: center">
          <template>
             <el-button type="primary" size="mini">编辑</el-button>
             <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  name: 'data',
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
        // results: []
      },
      rangeDate: '',
      total_count: 0,
      articlesStatus: [
        {
          type: '',
          label: '全部'
        },
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'danger',
          label: '审核失败'
        }
      ]
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 调用接口
    loadArticles () {
      const token = window.localStorage.getItem('token')
      this.$axios({
        url: '/articles',
        headers: {
          // token格式 Bearer token
          // Bearer 有个空格
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        this.filterForm = res.data.data
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    }
  }
}
</script>

<style lang='less' scoped>
.filterList{
  margin-top: 10px;
}
.search{
  padding: 0px;
}
</style>
