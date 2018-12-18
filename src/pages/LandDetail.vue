<template>
  <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
  <div class="basetable">
    <div class="selectMenu">
      <el-input v-model="search" clearable style="width: 200px" placeholder="请输入内容"/>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
      <el-button type="success" @click="add()">新增</el-button>
    </div>
    <!-- 主界面 -->
    <div class="tableMain">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column prop="landplanid" label="土地规划ID" width="150"></el-table-column>
        <el-table-column prop="landid" label="农场土地ID" width="150"></el-table-column>
        <el-table-column prop="leased" label="租贷人ID" width="150"></el-table-column>
        <el-table-column prop="landnumber" label="土地编号" width="150"></el-table-column>
        <el-table-column prop="landarea" label="土地面积" width="150"></el-table-column>
        <el-table-column prop="landtype" label="土地状态" width="150"></el-table-column>
        <el-table-column prop="creatdate" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="changedate" label="修改时间" width="150"></el-table-column>
        <el-table-column prop="changeid" label="修改人ID" width="150"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        :total="tableData.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新建编辑 -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="土地ID" :label-width="formLabelWidth">
          <el-input v-model="form.landplanid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="土地名称" :label-width="formLabelWidth">
          <el-input v-model="form.landid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="总面积" :label-width="formLabelWidth">
          <el-input v-model="form.leased" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用面积" :label-width="formLabelWidth">
          <el-input v-model="form.landnumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起租面积" :label-width="formLabelWidth">
          <el-input v-model="form.landarea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起租单价" :label-width="formLabelWidth">
          <el-input v-model="form.landtype" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.creatdate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.changedate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="修改人ID" :label-width="formLabelWidth">
          <el-input v-model="form.changeid" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from 'axios'
import { reformat } from '../common/js/reformat'
export default {
  data () {
    return {
      baseUrl: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example',
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      loading: true,
      // tableData: '',
      tableData: [
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-01'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-02'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-03'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-04'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-03'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-03'
        },
        {
          landplanid: '01',
          landid: 'A1',
          leased: '王',
          landnumber: 'A001',
          landarea: '20㎡',
          landtype: '已出租',
          changeid: '陈',
          changedate: '2018-06-03',
          creatdate: '2017-05-03'
        }
      ],

      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      // value6: '',
      currentPage3: 1,
      currentIndex: ''
    }
  },
  created () {
    // setTimeout(() => {
    //   this.loading = false
    // }, 1500)
    // this.getdata()
  },
  methods: {
    // showTime () {
    //   this.$alert(this.value6, '起止时间', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: '已显示'
    //       })
    //     }
    //   })
    // },
    // getdata () {
    //   let _this = this
    //   axios
    //     .post(this.baseUrl + '/getlanddetail')
    //     .then(function (response) {
    //       console.log(response.data.tableData)
    //       _this.tableData = response.data.tableData
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // },

    add () {
      this.form = {
        date: '',
        name: '',
        region: '',
        address: ''
      }
      this.dialogFormVisible = true
    },
    update () {
      this.form.changedate = reformat(this.form.changedate)
      this.form.creatdate = reformat(this.form.creatdate)

      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    cancel () {
      this.dialogFormVisible = false
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleSearch () {
      console.log(this.search)
    }
  }
}
</script>
<style lang="scss">
.basetable {
  .selectMenu {
  }
  .tableMain {
    margin: {
      top: 10px;
    }
  }
  .page {
    float: right;
    margin: {
      top: 10px;
    }
  }
}
</style>
