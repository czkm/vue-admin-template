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
                v-model="selecttime"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch()">查询</el-button>
            <el-button type="danger" @click="handleclear()">清除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column prop="nctdid" label="土地id"></el-table-column> -->
      <el-table-column prop="username" label="用户"></el-table-column>
      <el-table-column prop="phone" sortable label="手机号码"></el-table-column>
      <el-table-column prop="area" sortable label="租地面积"></el-table-column>
      <el-table-column prop="tdid" label="土地编号"></el-table-column>

      <!-- <el-table-column prop="love" sortable label="喜欢的蔬菜"> -->
      <el-table-column label="喜欢的蔬菜" width="200">
        <template slot-scope="scope">
          <!-- 循环得出喜欢蔬菜个数 -->
          <div class="lovediv" v-for="(love, index) in scope.row.love.vegetable" :key="index">
            <el-badge :value="scope.row.love.value[index]" :max="99" class="item">
              <el-tag size="medium">{{scope.row.love.vegetable[index]}}</el-tag>
            </el-badge>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="wish" label="添加心愿蔬菜"></el-table-column>
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
      //   tableData: [],
      path: 'VegetableCount ',
      xgrid: this.$store.state.xgrid, // 修改人id
      selecttime: '', // 选择时间
      searchform: {
        nc: '',
        sjhm: '',
        starttime: '',
        endtime: ''
      },
      tableData: [
        {
          username: '1',
          phone: '1',
          area: '1',
          tdid: '1',
          love: {
            vegetable: ['萝卜', '白菜', '地瓜'],
            value: ['10', '12', '15']
          },
          wish: '1'
        }
      ]
    }
  },
  methods: {
    handleSearch () {
      this.searchform.starttime = this.selecttime[0]
      this.searchform.endtime = this.selecttime[1]
      this.searchData = {
        nc: this.searchform.nc,
        sjhm: this.searchform.sjhm,
        starttime: this.searchform.starttime,
        endtime: this.searchform.endtime
      }
      this.handleDataGet()
    },
    handleclear () {
      this.searchform = {
        nc: '',
        sjhm: '',
        starttime: '',
        endtime: ''
      }
      this.selecttime = ''
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
      //   this.handleDataGet()
    })
  }
}
</script>

<style lang="scss" scoped>
.count {
  text-align: right;
}
.lovediv{

    float: left;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
