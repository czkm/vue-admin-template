<template>
  <div class="box">

 <el-input v-model="search"
    clearable
    style="width: 200px"
    placeholder="请输入内容"/>
 <el-button type="primary"
        @click="handleSearch()">搜索</el-button>
         <el-button class="btn-add" type="success"
        @click="handleAdd()">添加</el-button>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号码">
    </el-table-column>
    <el-table-column
      prop="sender"
      label="寄件人">
    </el-table-column>
    <el-table-column
      prop="receiver"

      label="收件人">
    </el-table-column>
    <el-table-column
      prop="receiverphone"
      label="收件人电话">
    </el-table-column>
    <el-table-column
      prop="receiveraddress"
      label="收件人地址">
    </el-table-column>
    <el-table-column
      prop="deliverycycle"
      sortable
      label="配送周期">
    </el-table-column>
    <el-table-column
      prop="deliverytime"
      sortable
      label="配送次数">
    </el-table-column>
    <el-table-column
      prop="deliverytype"
      label="配送种类">
    </el-table-column>
      <el-table-column
      prop="deliveryweight"
      label="配送重量">
    </el-table-column>

   <el-table-column label="是否寄出" >
      <template slot-scope="scope">
         <i v-if="scope.row.status == 1" class="el-icon-check"></i>
         <i v-else class="el-icon-close"></i>
         </template>
    </el-table-column>

      <el-table-column
      prop="sendtime"
      label="寄出时间">
    </el-table-column>
     <el-table-column
      prop="sendnumber"
      label="寄出单号">
    </el-table-column>
     <el-table-column
      prop="cost"
      label="快递金额">
    </el-table-column>
   <el-table-column label="操作" width="220">
      <template slot-scope="scope">
                  <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="寄出"
                  inactive-text="待寄出"
                  v-model="scope.row.status"
                  @change=change(scope.$index,scope.row)>
                  </el-switch>
        </template>

      </el-table-column>
  </el-table>
  </div>
</template>

<script>
// import Axios from '@/api/Axios'
import {reqOrderManage} from '@/api'
export default {
  data () {
    return {
      userid: '1',
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.httpGet()
    })
    reqOrderManage({}).then(res => {
      console.log(res)
      this.tableData = res.tableData
    })
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSearch () {
      console.log(this.search)
    },
    change (index, row) {
      console.log(index, row + this.tableData[index].status)
    },
    httpGet () {
      // this.$axios({
      //   url: this.$store.state.bseurl + '/OrderManage',
      //   method: 'post'

      // }).then(res => {
      //   this.tableData = res.data.tableData
      //   // console.log(res)
      // })

    }

  }
}
</script>

<style lang="scss" scoped>
.count{
  text-align: right
}
</style>
