<template>
  <div class="box">

 <!-- <el-input v-model="search"
    clearable
    style="width: 200px"
    placeholder="请输入内容"/>
 <el-button type="primary"
        @click="handleSearch()">搜索</el-button>
         <el-button class="btn-add" type="success"
        @click="handleAdd()">新增</el-button> -->

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
      <!-- <el-date-picker type="date" placeholder="选择日期" v-model="searchform.starttime" style="width: 100%;"></el-date-picker> -->
        <el-date-picker
      v-model="searchform.time"
       value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-col>

  </el-form-item>
      <!-- <el-form-item label="活动区域">
        <el-select v-model="searchform.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="danger" @click="handleclear">清除</el-button>
      </el-form-item>
    </el-form>
    </el-col>
</el-row>
  <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"

    border
    style="width: 100%">

    <el-table-column
      prop="cymc"
      label="菜园名称">
    </el-table-column>
      <el-table-column
      prop="zdsl"
      sortable
      label="租地数量">
    </el-table-column>

     <!-- <el-table-column label="头像"  width="200">
        <template slot-scope="scope">
          <img  :src="scope.row.headimg" alt="" style="width: 50px;height: 50px">
        </template>
        </el-table-column> -->
    <el-table-column
      prop="ncmc"

      label="农场名称">
    </el-table-column>

    <el-table-column
      prop="nc"
      sortable
      label="昵称">
    </el-table-column>
     <el-table-column
      prop="sjhm"
      label="手机号码">
    </el-table-column>
    <el-table-column
      prop="zdmj"
      sortable
      label="租地面积/㎡">
    </el-table-column>

 <el-table-column
      prop="zdje"
      sortable
      label="租地金额/元">
    </el-table-column>
    <el-table-column
      prop="qzsj"
      sortable
      label="起租时间" width="200">
    </el-table-column>
    <el-table-column
      prop="dzsj"
      sortable
      label="到租时间" width="200">
    </el-table-column>
    <el-table-column label="支付类型" >
      <template slot-scope="scope">
         <i v-if="scope.row.zflx == 1" >支付宝</i>
         <i v-else-if="scope.row.zflx == 2" >微信</i>
         <i v-else >其他</i>
         </template>
    </el-table-column>

      <el-table-column
      prop="zfddh"
      sortable
      label="支付订单号">
    </el-table-column>
    <el-table-column
      prop="zfsj"
      sortable
      label="支付时间">
    </el-table-column>

  </el-table>
  <el-pagination
        :current-page="currentPage"
        :page-sizes="[10,15]"
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
      QueryUrl: this.$store.state.BaseUrl + '/userinfo/queryleaseinfo',
      total: 0,
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: [],

      searchform: {
        nc: '',
        sjhm: '',
        time: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let _this = this
      let nc = _this.searchform.nc
      let sjhm = _this.searchform.sjhm
      let starttime = _this.searchform.time[0]
      let endtime = _this.searchform.time[1]
      console.log(_this.searchform)
      this.$axios.post(this.QueryUrl, {
        nc,
        sjhm,
        starttime,
        endtime

      }).then(res => {
        console.log(res)
        _this.tableData = res.data.rows
      })
    },
    handleclear () {
      this.searchform.nc = ''
      this.searchform.sjhm = ''
      this.searchform.time = ''
      this.handleDataGet()
    },
    // 显示编辑界面
    // handleEdit: function (index, row) {
    //   this.editFormVisible = true
    //   this.editForm = Object.assign({}, row)
    // },
    // handleDelete (index, row) {
    //   console.log(index, row)
    // },
    // handleSearch () {
    //   console.log(this.search
    //   )
    // },

    httpGet () {
      this.handleDataGet()
    },
    // 页面加载获取初始值
    handleDataGet () {
      let _this = this
      this.$axios.post(this.QueryUrl, {
        page: 1,
        limit: _this.pagesize
      }).then(res => {
        console.log(res)
        console.log(res.data.rows)
        let total = res.data.total// 返回页面总数
        let limit = res.data.limit// 返回页数限制
        let page = res.data.page// 返回第几页
        _this.tableData = res.data.rows
        _this.currentPage = page// 初始页
        _this.total = total // 获取页面总数
        _this.pagesize = limit// 初始页
      })
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      let _this = this
      this.pagesize = size
      console.log(this.pagesize)
      this.$axios.post(this.QueryUrl, {
        page: 1,
        limit: _this.pagesize
      }).then(res => {
        console.log(res.data.rows)
        let total = res.data.total// 返回页面总数
        // let limit = res.data.limit//返回页面总数
        let page = res.data.page// 返回页面
        _this.tableData = res.data.rows
        _this.currentPage = page// 初始页
        _this.total = total
      })
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      let _this = this
      this.$axios.post(this.QueryUrl, {
        page: currentPage,
        limit: _this.pagesize
      }).then(res => {
        console.log(res)
        _this.tableData = res.data.rows
      })
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
.count{
  text-align: right
}
</style>
