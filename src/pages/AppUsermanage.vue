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
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.nc" placeholder="用户名"></el-input>
      </el-form-item>
       <el-form-item label="手机号">
        <el-input v-model="formInline.sjhm" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
    <el-col :span="15">
      <el-date-picker type="date" placeholder="选择日期" v-model="formInline.starttime" style="width: 100%;"></el-date-picker>
    </el-col>

  </el-form-item>
      <!-- <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    </el-col>
</el-row>
  <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"

    border
    style="width: 100%">
    <el-table-column
      prop="nc"
      label="用户">
    </el-table-column>
    <el-table-column
      prop="sjhm"
      label="手机">
    </el-table-column>
     <el-table-column label="头像"  width="200">
        <template slot-scope="scope">
          <img  :src="scope.row.headimg" alt="" style="width: 50px;height: 50px">
        </template>
        </el-table-column>
    <el-table-column
      prop="zcsj"
      sortable
      label="时间">
    </el-table-column>

    <!-- <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column> -->
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
      total: 0,
      search: '',
      currentPage: 1, // 初始页
      pagesize: 5, //    每页的数据
      // // 编辑界面数据
      // editForm: {
      //   id: 0,
      //   name: '',
      //   price: 0,
      //   desc: '',
      //   reserve: ''
      // },
      tableData: [],
      formInline: {
        nc: '',
        sjhm: '',
        starttime: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let _this = this
      // console.log(_this.formInline.nc)
      console.log('submit!')

      this.$axios.post('http://172.16.0.67:8088/farmbackstage/appuser/queryuser', {
        nc: _this.formInline.nc,
        sjhm: _this.formInline.sjhm,
        starttime: _this.formInline.starttime

      }).then(res => {
        console.log(res)
        // let total = res.data.total// 返回页面总数
        // // let limit = res.data.limit//返回页面总数
        // let page = res.data.page// 返回页面
        _this.tableData = res.data.rows
        // _this.currentPage = page// 初始页
        // _this.total = total
      })
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSearch () {
      console.log(this.search
      )
    },

    httpGet () {
      this.handleDataGet()
    },
    // 页面加载获取初始值
    handleDataGet () {
      let _this = this
      this.$axios.post('http://172.16.0.67:8088/farmbackstage/appuser/queryuser', {
        page: 1,
        limit: _this.pagesize

      }).then(res => {
        console.log(res.data)
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
      this.$axios.post('http://172.16.0.67:8088/farmbackstage/appuser/queryuser', {
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
      this.$axios.post('http://172.16.0.67:8088/farmbackstage/appuser/queryuser', {
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
