<template>
  <div class="box">
    <el-input v-model="search"
    clearable
    style="width: 200px"
    placeholder="请输入内容"/>
    <!-- <el-dropdown> -->
  <!-- <el-button type="primary">
    选择月份<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="five">5月</el-dropdown-item>
    <el-dropdown-item @click.native="six">6月</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<div class="mounthcount">
        <el-button   type="success" plain>{{ mounth }}总计:{{ nowprice }}元</el-button>
</div> -->
    <!-- 分页器初始:data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
    <el-table
      :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      height="600"
      style="width: 100%">
      <el-table-column
        label="租地开始日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span  v-html="format(scope.row.startdate)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="租地结束日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span  v-html="format(scope.row.enddate)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="150">
        <template slot-scope="scope">
          <!-- <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-html="format(scope.row.name)"/>
            </div>
          </el-popover> -->
          <el-tag size="medium" v-html="format(scope.row.name)"/>

        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.phone)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="地区"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.area)"/>
        </template>
      </el-table-column>
       <el-table-column
        label="土地区域"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.landarea)"/>
        </template>
      </el-table-column>
      <el-table-column
        label="面积"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.acreage)"/>
        </template>
      </el-table-column>
       <el-table-column
        label="年限"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.rentlimit)"/>
        </template>
      </el-table-column>
          <el-table-column
        label="支付状态"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.state)"/>
        </template>
      </el-table-column>

      <el-table-column
        label="支付金额"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.price)"/>
        </template>
      </el-table-column>
        <el-table-column
        label="支付类型"
        width="150">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.type)"/>
        </template>
      </el-table-column>
        <el-table-column
        label="地址"
        width="250">
        <template slot-scope="scope">
          <span  v-html="format(scope.row.address)"/>
        </template>
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
          :page-sizes="[5, 10]"
          :page-size="pagesize"
          :total="tableData.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- <div class="count">
        <el-button  type="primary" plain>总计:{{ totalprice }}元</el-button>
        </div> -->

  </div>
</template>

<script>

export default {

  data () {
    return {
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      mounth: '',
      tableData: [
        {
          startdate: '2016-05-02',
          enddate: '2017-05-02',
          mounth: '05',
          name: '王小虎',
          phone: '1213132121',
          area: '北京',
          landarea: 'A1',
          acreage: '50㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-07-04',
          enddate: '2017-07-04',
          mounth: '07',
          name: '王季虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '120㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-07-02',
          enddate: '2017-07-04',
          mounth: '07',
          name: '王小虎',
          phone: '1213132121',
          area: '北京',
          landarea: 'A1',
          acreage: '50㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-07-04',
          enddate: '2017-07-04',
          mounth: '07',
          name: '王季虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '120㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-06-01',
          enddate: '2017-06-04',
          mounth: '06',
          name: '王伯虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '50㎡',
          rentlimit: '1年',
          state: '未支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-06-03',
          enddate: '2017-06-04',
          mounth: '06',
          name: '王叔虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '50㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '微信',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-05-04',
          enddate: '2017-05-04',
          mounth: '05',
          name: '王季虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '120㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          startdate: '2016-05-04',
          enddate: '2017-05-04',
          mounth: '05',
          name: '王季虎',
          phone: '1213132121',
          area: '福建',
          landarea: 'A1',
          acreage: '120㎡',
          rentlimit: '5年',
          state: '支付',
          price: '3600',
          type: '支付宝',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    }
  },

  computed: {
    // 表格模糊查询
    tables () {
      const search = this.search
      console.log('this.tableData', this.tableData.index)
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      // console.log('this.tableData', this.tableData)
      return this.tableData
    },
    // 计算价格
    nowprice () {
      let nowprice = 0
      if (this.search) {
        for (const i in this.tableData) {
          if (this.search === this.tableData[i].mounth) {
            console.log('月份')
            nowprice += this.tableData[i].price * 1
          }
        }
        // for (const i in this.tableData) {
        // // console.log(i)
        //   if (this.tableData[i].price) // 如果checkeds[i]的结果为truth，则进行累加
        //   // eslint-disable-next-line brace-style
        //   { nowprice += this.tableData[i].price * 1 }
        // }
      }

      console.log(nowprice)
      return nowprice
    },

    totalprice () {
      let total = 0
      for (const i in this.tableData) {
        // console.log(i)
        if (this.tableData[i].price) // 如果checkeds[i]的结果为truth，则进行累加
        // eslint-disable-next-line brace-style
        { total += this.tableData[i].price * 1 }
      }
      console.log(total)
      return total
    }
  },

  methods: {
    five () {
      this.search = '05'
      this.mounth = '5月'
      console.log(this.search)
    },
    six () {
      this.search = '06'
      this.mounth = '6月'
      console.log(this.search)
    },
    // serchitem () {
    //   this.search = '05'
    //   console.log(this.search)
    // },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    format (val) {
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="#89CACCe">' + this.search + '</font>')
      } else {
        return val
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.count{
  text-align: right
}
.mounthcount{
  float: right
}
</style>
