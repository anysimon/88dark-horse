<template>
  <div class="comment">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table :data="comments" style="width: 100%">
        <el-table-column
          prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="comment_status" label="评论状态" align="center">
          <template slot-scope="scope">
            <el-button
            size="mini"
            :type="!scope.row.comment_status ? 'success' : 'danger' "
            v-text="!scope.row.comment_status ? '打开评论' : '关闭评论'"
            @click='TrfanStatus(scope.row)'>
            打开评论</el-button>
          </template>
        </el-table-column>
        <el-table-column
           prop="total_comment_count" label="总评论数" align="center">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
          <el-button type="primary" size="mini"
          @click="$router.push('/comments/'+ scope.row.id)">
          修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total_count"
        :disabled = 'disabled'
        @current-change="getPage"
        align="center"
        style="margin:40px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      comments: [],
      total_count: null,
      disabled: true,
      'scope.row.comment_status': ''
    }
  },
  methods: {
    getComments (page) {
      this.disabled = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page
        }
      })
        .then(res => {
          // console.log(res)
          this.comments = res.data.data.results
          this.total_count = res.data.data.total_count
        })
        .catch(err => {
          console.log(err, '获取评论失败')
        })
        .finally(() => {
          this.disabled = false
        })
    },
    getPage (page) {
      this.getComments(page)
    },
    TrfanStatus (comment) {
      // console.log(comment.comment_status)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: comment.id.toString()
        },
        data: {
          allow_comment: !comment.comment_status
        }
      }).then(res => {
        // console.log(res)
        this.$message({
          message: '修改状态成功',
          type: 'success'
        })
        // this.getComments()
        comment.comment_status = !comment.comment_status
      }).catch(err => {
        console.log(err)
        this.$message.error(err, '修改失败')
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
