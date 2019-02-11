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
                :clearable= false
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
      :data="tableData"
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
// import Headxiaos from '../api/ajax.js'

export default {
  data () {
    return {
      // searchData: {}, // 传递后台查询对象

      path: 'AppUsermanage',
      loading: true,
      QueryUrl: this.$store.state.BaseUrl + '/userinfo/queryuser',
      total: 0,
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

    handleSearch () {
      let _this = this
      this.loading = true

      let nc = _this.searchform.nc
      let sjhm = _this.searchform.sjhm
      let starttime = _this.searchform.time[0]
      let endtime = _this.searchform.time[1]
      // 请求头带参
      this.$Haxios(this.QueryUrl, {
        nc,
        sjhm,
        starttime,
        endtime
      }, this.path, this.getCookie('token'))
        .then((res) => {
          console.log(res.rows)
          _this.tableData = res.data.rows
          _this.loading = false
          _this.total = res.data.total
          _this.page = res.data.page
          _this.limit = res.data.limit
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleclear () {
      this.searchform = {
        nc: '',
        sjhm: '',
        time: ''
      }
      this.handleDataGet()
    },

    // 页面加载获取初始值
    handleDataGet () {
      // 页面 限制 路径 路由路径 token

      this.PageAxios(1, this.pagesize, this.QueryUrl, this.path, this.getCookie('token'), this.searchform)
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      this.PageAxios(1, size, this.QueryUrl, this.path, this.getCookie('token'), this.searchform)
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      this.PageAxios(currentPage, this.pagesize, this.QueryUrl, this.path, this.getCookie('token'), this.searchform)
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.handleDataGet()
    })
  }
}
</script>

<style lang="scss" scoped>
.count {
  text-align: right;
}
</style>
