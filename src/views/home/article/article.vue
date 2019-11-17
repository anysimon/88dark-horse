<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="channels_id" placeholder="请选择">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
              v-model="regDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- ----------------------------渲染列表----------------------------------------- -->
    <el-card class="box-card" style="margin-top:10px">
      <div slot="header" class="clearfix">
        <span>共找到{{ total_count }}条符合条件的内容</span>
      </div>
      <!--
        在element-ui的el-table中
        data 表示表格的数据 格式为数组array  在表格内部会自己遍历数据
        在el-table-column 中  默认只能渲染普通文本 如果需要渲染其他内容 需要使用自定义表格列
        prop 指渲染哪个数据  label 指表头名称
      -->
      <el-table :data="results" style="width: 100%" v-loading="loading">
        <el-table-column prop="cover" label="封面" align="center">
          <!--
            自定义表格列  使用时 需要先在template中声明 slot-scope='scope' (作用域插槽)
            scope.row 为results中的每一项 通过.cover.images[0] 可以获取到图片地址
          -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" style="width: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" align="center"></el-table-column>
        <el-table-column prop="edit" label="操作" align="center">
          <template slot-scope="scope">
          <el-button type="primary" size="mini" @click='editArticle(scope.row.id)'>编辑</el-button>
          <el-button type="danger" size="mini" @click='deleteArticle(scope.row.id)'>删除</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination
        background
        :disabled="loading"
        :current-page="current_page"
        layout="prev, pager, next"
        :total="total_count"
        style="text-align: center;margin: 25px"
        @current-change="changeConent"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 给组件起个名字  可以在Vue调试工具中快速查找值
  name: 'ArticleList',
  data () {
    return {
      total_count: 0, // 总列表数
      results: [], // 文章列表
      status: null, // 文章状态
      loading: true, // 加载状态
      channels: [], // 获取频道
      channels_id: null, // 频道id
      current_page: 1, // 分页器的当前页数
      regDate: [], // 时间
      articleStatus: [
        {
          type: '',
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
          type: 'info',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '草稿'
        }
      ]
    }
  },
  methods: {
    // 获取文章列表
    getArticle (page) {
      // console.log(page)
      this.loading = true
      const token = window.localStorage.getItem('token')
      this.$axios({
        url: '/articles',
        // 在这个项目中，除了/login不需要token  其他的都需要token  否则报错401
        // 提交token 需要先在本地存储中获取到登录时提交的token 然后在请求头中携带提交
        // token提交格式  按照接口文档 headers 以对象的格式 Authorization: `Bearer ${token}`
        // 需要注意的是 Bearer 后面有个空格！！！！！！！
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Query参数
        params: {
          page,
          status: this.status,
          channel_id: this.channels_id,
          begin_pubdate: this.regDate ? this.regDate[0] : null,
          end_pubdate: this.regDate ? this.regDate[1] : null
        }
      })
        .then(res => {
          // console.log(res)
          this.total_count = res.data.data.total_count
          this.results = res.data.data.results
          this.current_page = res.data.data.page
        })
        .catch(err => {
          console.log(err, '获取文章列表失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 分页器 页面改变时触发
    changeConent (page) {
      this.getArticle(page)
    },
    // 获取频道
    getChannels () {
      this.$axios
        .get('/channels')
        .then(res => {
          // console.log(res)
          this.channels = res.data.data.channels
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查询功能
    onSubmit (page) {
      this.getArticle(page)
    },
    // 删除功能
    deleteArticle (id) {
      // console.log(JSON.parse(id))
      const token = window.localStorage.getItem('token')
      this.$axios({
        method: 'DELETE',
        url: `/articles/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res)
        this.getArticle(this.current_page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }
  },
  // 在Vue实例创建完成后调用获取文章列表并渲染到页面
  created () {
    this.getArticle()
    this.getChannels()
  }
}
</script>

<style>
</style>
