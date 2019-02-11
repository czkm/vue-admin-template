<template>
  <div class="box">
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
                :clearable="false"
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
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="danger" @click="handleclear">清除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cymc" label="菜园名称"></el-table-column>
      <el-table-column prop="zdsl" sortable label="租地数量"></el-table-column>

      <el-table-column prop="ncmc" label="农场名称"></el-table-column>

      <el-table-column prop="nc" sortable label="昵称"></el-table-column>
      <el-table-column prop="sjhm" label="手机号码"></el-table-column>
      <el-table-column prop="zdmj" sortable label="租地面积/㎡"></el-table-column>

      <el-table-column prop="zdje" sortable label="租地金额/元"></el-table-column>
      <el-table-column prop="qzsj" sortable label="起租时间" width="200"></el-table-column>
      <el-table-column prop="dzsj" sortable label="到租时间" width="200"></el-table-column>
      <el-table-column label="支付类型">
        <template slot-scope="scope">
          <i v-if="scope.row.zflx == 1">支付宝</i>
          <i v-else-if="scope.row.zflx == 2">微信</i>
          <i v-else>其他</i>
        </template>
      </el-table-column>

      <el-table-column prop="zfddh" sortable label="支付订单号"></el-table-column>
      <el-table-column prop="zfsj" sortable label="支付时间"></el-table-column>
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
      QueryUrl: this.$store.state.BaseUrl,
      //  'http://172.16.0.67:8088/farmbackstage',
      total: 0,
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: [],
      path: 'UserManage ',
      xgrid: this.$store.state.xgrid, // 修改人id
      searchform: {
        nc: '',
        sjhm: '',
        time: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      let _this = this
      let nc = _this.searchform.nc
      let sjhm = _this.searchform.sjhm
      let starttime = _this.searchform.time[0]
      let endtime = _this.searchform.time[1]
      console.log(_this.searchform)
      this.$Haxios(
        this.QueryUrl + '/userinfo/queryleaseinfo',
        {
          nc,
          sjhm,
          starttime,
          endtime
        },
        this.path,
        this.getCookie('token')
      ).then(res => {
        console.log(res)
        _this.tableData = res.data.rows
        _this.loading = false
        _this.total = res.data.total
        _this.page = res.data.page
        _this.limit = res.data.limit
      })
    },
    handleclear () {
      this.searchform.nc = ''
      this.searchform.sjhm = ''
      this.searchform.time = ''
      this.handleDataGet()
    },

    handleDataGet () {
      this.PageAxios(
        1,
        this.pagesize,
        this.QueryUrl + '/userinfo/queryleaseinfo',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      this.PageAxios(
        1,
        size,
        this.QueryUrl + '/userinfo/queryleaseinfo',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      this.PageAxios(
        currentPage,
        this.pagesize,
        this.QueryUrl + '/userinfo/queryleaseinfo',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
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
