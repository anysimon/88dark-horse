<template>
  <div>
    <el-card class="box-card search">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- ---------------------- -->
      <el-form label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <el-radio :label="null" value='全部'>全部</el-radio>
            <el-radio label="0" value='草稿' v-model="filterForm.status">草稿</el-radio>
            <el-radio label="1" value='待审核' v-model="filterForm.status">待审核</el-radio>
            <el-radio label="2" value='审核通过' v-model="filterForm.status">审核通过</el-radio>
            <el-radio label="3" value='审核失败' v-model="filterForm.status">审核失败</el-radio>
            <el-radio label="4" value='已删除' v-model="filterForm.status">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option v-for='item in channels' :key='item.id' :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <template>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='searchList(1)'>查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- ---------------------------------------------------------------渲染文章 -->
      <el-card class="box-card filterList">
      <div slot="header" class="clearfix">
        <span>共找到{{total_count}}条符合条件的内容</span>
      </div>
      <el-table :data="articles" style="width: 100%;text-align: center" v-loading="loading">
        <el-table-column prop="imges" label="封面" width="180" align='center'>
          <template slot-scope="scope">
            <!-- secope.row 就是遍历项  相当于每一项 item -->
            <img width="50" :src="scope.row.cover.images[0]">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="220" align='center'></el-table-column>
        <el-table-column prop="status" label="状态" align='center'>
          <template slot-scope="scope">
            <el-tag
            :type='articlesStatus[scope.row.status].type'>
            {{ articlesStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" align='center'></el-table-column>
        <el-table-column prop="edit" label="操作" align='center'>
          <template>
             <el-button type="primary" size="mini">编辑</el-button>
             <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-card>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change = 'getPage'
        :total="total_count">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'article_data',
  data () {
    return {
      filterForm: {
        status: null,
        channel_id: null
      },
      rangeDate: '', // 日期
      total_count: 0, // 总页数
      loading: true, // 控制加载组件的开启关闭
      channels: [], // 频道列表
      articles: [], // 文章列表
      articlesStatus: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        }
      ]
    }
  },
  created () {
    this.loadArticles(1)
    this.getChannels()
  },
  methods: {
    // 渲染页面调用接口
    loadArticles (page = 1) {
      this.loading = true
      const token = window.localStorage.getItem('token')
      this.$axios({
        url: '/articles',
        headers: {
          // token格式 Bearer token
          // Bearer 有个空格
          Authorization: `Bearer ${token}`
        },
        params: {
          page, // 文章页数
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道ID
          begin_pubdate: this.rangeDate[0], // 起始日期
          rangeDate: this.rangeDate[1] // 截止日期
        }
      }).then(res => {
        // console.log(res)
        this.filterForm = res.data.data
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
      }).finally(res => {
        this.loading = false
      })
    },
    // 点击页数页面变化
    getPage (page) {
      this.loadArticles(page)
    },
    // 查询文章
    searchList () {
      this.loadArticles()
    },
    // 获取频道
    getChannels () {
      this.$axios.get('/channels').then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
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
.el-pagination{
  text-align: center;
  margin: 20px;
}
</style>
