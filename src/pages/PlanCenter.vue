<template>
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform" class="demo-form-inline">
          <el-form-item label="农场名称">
            <el-input v-model="searchform.ncmc" placeholder="请输入农场名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="danger" @click="handleclear">清除</el-button>

          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="nc" label="用户昵称" width="100"></el-table-column>
      <el-table-column prop="ncmc" label="农场名称" width="100"></el-table-column>
      <el-table-column prop="scmc" label="昵称" width="200"></el-table-column>
      <el-table-column prop="sjhm" label="手机号码" width="200"></el-table-column>
      <!-- <el-table-column prop="sczz" sortable label="蔬菜种植"></el-table-column> -->
      <el-table-column prop="zzmj" label="种植面积" width="100"></el-table-column>

      <el-table-column prop="bzsj" sortable label="播种时间" width="200"></el-table-column>
      <el-table-column prop="scmc" label="蔬菜名称" width="200"></el-table-column>
      <el-table-column prop="sczq" sortable label="种植周期" width="200"></el-table-column>

      <el-table-column label="操作" class="btn-group" width="450">
        <template slot-scope="scope">
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>播种次数: 1</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleSeed(scope.$index, scope.row)">播种</el-button>
              </div>
            </el-popover>
          </div>

          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>浇水次数:</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleWater(scope.$index, scope.row)">浇水</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>除草次数:</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleWeed(scope.$index, scope.row)">除草</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>施肥次数:</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleManure(scope.$index, scope.row)">施肥</el-button>
              </div>
            </el-popover>
          </div>

          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>收成</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleWater(scope.$index, scope.row)">浇水</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>收获次数:</p>
              <div slot="reference" class="name-wrapper">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleGain(scope.$index, scope.row)"
                >每周收获</el-button>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
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
// import axios from 'axios'
// import Axios from '@/api/Axios'
export default {
  data () {
    return {
      path: 'PlanCenter',
      xgrid: this.$store.state.xgrid, // 修改人id
      QueryUrl: this.$store.state.BaseUrl,
      loading: true,

      total: 0, // 总数
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      reponseData: '',
      searchform: {
        ncmc: ''
      },

      tableData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleDataGet()
    })
  },

  methods: {
    // 页面加载获取初始值
    handleDataGet () {
      // 页面 限制 路径 路由路径 token

      this.PageAxios(
        1,
        this.pagesize,
        this.QueryUrl + '/userinfo/querymyplant',
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
        this.QueryUrl + '/userinfo/querymyplant',
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
        this.QueryUrl + '/userinfo/querymyplant',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    handleclear () {
      this.searchform = {
        ncmc: ''
      }
      this.handleDataGet()
    },
    // 搜索
    handleSearch () {
      this.searchData = { ncmc: this.searchform.ncmc }
      this.handleDataGet()
    },

    // 操作选项
    handleSeed (index, row) {
      // let _this = this
      console.log(index, row + 'handleSeed')
      console.log(this.tableData[index].value)
    },
    handleWater (index, row) {
      console.log(index, row + 'handleWater')
    },
    handleWeed (index, row) {
      console.log(index, row + 'handleWeed')
    },
    handleManure (index, row) {
      console.log(index, row + 'handleManure')
    },
    handleGain (index, row) {
      console.log(index, row + 'handleGain')
    }
  }
}
</script>

<style lang="scss" scoped>
.badgeitem {
  margin-top: 10px;
  margin-right: 10px;
}
.count {
  text-align: right;
}
.btn-option {
  float: left;
  margin-left: 10px;
}
.btn-type {
  //  margin-left: 10px;
}
</style>
