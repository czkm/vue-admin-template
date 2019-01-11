<template>
  <div class="box" v-loading="loading" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="searchform.nc" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchform.sjhm" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-col :span="15">
              <el-date-picker
                v-model="searchform.time"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="danger" @click="handleclear">清除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column prop="nc" label="用户"></el-table-column>
      <el-table-column prop="sjhm" label="手机"></el-table-column>
      <el-table-column label="头像" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.headimg" alt style="width: 50px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="zcsj" sortable label="时间"></el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5,10]"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      QueryUrl: this.$store.state.BaseUrl + '/userinfo/queryuser',
      total: 0,
      search: '',
      currentPage: 1, // 初始页
      pagesize: 5, //    每页的数据
      tableData: [],
      searchform: {
        nc: '',
        sjhm: '',
        time: ''
      }
    }
  },
  methods: {
    // 传第几页，页数限制
    PageAxios (page, limit) {
      this.loading = true
      let _this = this
      this.$axios
        .post(this.QueryUrl, {
          page,
          limit
        })
        .then(res => {
          console.log(res.data)
          console.log(res.data.rows)
          let total = res.data.total // 返回页面总数
          let limit = res.data.limit // 返回页数限制
          // let page = res.data.page // 返回第几页
          _this.tableData = res.data.rows
          // _this.currentPage = page // 初始页
          _this.total = total // 获取页面总数
          _this.pagesize = limit // 初始页
          // 停止加载动画
          _this.loading = false
        })
    },
    handleSearch () {
      let _this = this
      this.loading = true
      let nc = _this.searchform.nc
      let sjhm = _this.searchform.sjhm
      let starttime = _this.searchform.time[0]
      let endtime = _this.searchform.time[1]
      console.log('submit!')
      this.$axios
        .post(this.QueryUrl, {
          nc,
          sjhm,
          starttime,
          endtime
        })
        .then(res => {
          console.log(res)

          _this.tableData = res.data.rows
          _this.loading = false
        })
    },
    handleclear () {
      this.searchform.nc = ''
      this.searchform.sjhm = ''
      this.searchform.time = ''
      this.handleDataGet()
    },

    httpGet () {
      this.handleDataGet()
    },
    // 页面加载获取初始值
    handleDataGet () {
      this.PageAxios(1, this.pagesize)
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      // this.pagesize = size
      // console.log(this.pagesize)
      this.PageAxios(1, size)
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      // let _this = this
      console.log(currentPage)
      this.PageAxios(currentPage, this.pagesize)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.httpGet()
    })
  }
}
</script>

<style lang="scss" scoped>
.count {
  text-align: right;
}
</style>
