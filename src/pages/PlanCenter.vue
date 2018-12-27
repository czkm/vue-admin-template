<template>
  <div class="box">
    <el-input v-model="search" clearable style="width: 200px" placeholder="请输入内容"/>
    <!-- 分页器初始:data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
    <el-table
      :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      height="600"
      style="width: 100%"
    >
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-tag size="medium" v-html="format(scope.row.name)"/>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="150">
        <template slot-scope="scope">
          <span v-html="format(scope.row.phone)"/>
        </template>
      </el-table-column>

      <el-table-column label="面积" width="150">
        <template slot-scope="scope">
          <span v-html="format(scope.row.acreage)"/>
        </template>
      </el-table-column>

      <el-table-column label="开垦时间" width="150">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"/> -->
          <span v-html="format(scope.row.startdate)"/>
        </template>
      </el-table-column>

      <el-table-column label="播种时间" width="150">
        <template slot-scope="scope">
          <span v-html="format(scope.row.seedtime)"/>
        </template>
      </el-table-column>
      <el-table-column label="种植种类" width="150">
        <template slot-scope="scope">

      <el-select v-model="scope.row.value" placeholder="请选择">
            <el-option
              v-for="item in scope.row.type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>

        </template>
      </el-table-column>

      <el-table-column label="种植周期" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-html="format(scope.row.plant)"/>
        </template>
      </el-table-column>

      <el-table-column label="收获时间" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-html="format(scope.row.enddate)"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" class="btn-group">
        <template slot-scope="scope">
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>播种次数: {{ scope.row.option[0] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleSeed(scope.$index, scope.row)">播种</el-button>
              </div>
            </el-popover>
          </div>

          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>浇水次数: {{ scope.row.option[1] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleWater(scope.$index, scope.row)">浇水</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>除草次数: {{ scope.row.option[2] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleWeed(scope.$index, scope.row)">除草</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>施肥次数: {{ scope.row.option[3] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button size="mini" @click="handleManure(scope.$index, scope.row)">施肥</el-button>
              </div>
            </el-popover>
          </div>
          <div class="btn-option">
            <el-popover trigger="hover" placement="top">
              <p>收获次数: {{ scope.row.option[4] }}</p>
              <div slot="reference" class="name-wrapper">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleGain(scope.$index, scope.row)"
                >收获</el-button>
              </div>
            </el-popover>
          </div>
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
</template>

<script>
// import axios from 'axios'
// import Axios from '@/api/Axios'
export default {
  data () {
    return {
      reponseData: '',
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.httpGet()
      this.testaxios()
    })
  },
  // created () {
  //   this.$nextTick(() => {
  //     this.httpGet()
  //   })
  // },
  computed: {
    // 表格模糊查询
    tables () {
      const search = this.search
      if (search) {
        console.log('this.tableData', this.tableData)
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      console.log('this.tableData', this.tableData)
      return this.tableData
    }
    // 计算价格
    // totalprice () {
    //   let total = 0
    //   for (const i in this.tableData) {
    //     console.log(i)
    //     if (this.tableData[i].price) // 如果checkeds[i]的结果为truth，则进行累加
    //     // eslint-disable-next-line brace-style
    //     { total += this.tableData[i].price * 1 }
    //   }
    //   console.log(total)
    //   return total
    // }
  },

  methods: {

    httpGet () {
      this.$axios({
        url: this.$store.state.bseurl + '/getplant',
        method: 'post'

      }).then(res => {
        this.tableData = res.data.tableData
        // console.log(res)
      })
      // Axios.getTest('getmessagepanel').then(res => {
      //   console.log(res)
      // })
    },
    testaxios () {
      // this.$axios.post('http://172.16.0.128:8090/balance/housing/fwuser/index', {
      //   openid: 122

      // },
      // {
      //   header: {
      //     'Content-Type': 'application/json;charset=UTF-8'

      //   }
      // }
      // )
      //   .then(function (response) {
      //     console.log('人体生物节律一段时间')
      //     console.log(response)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })

      this.$axios.post('http://yunshi.fancybull.cn/yscs/wx/rhyt/getrhythms', {wxuserid: 3}
        // headers: {
        //   'Content-Type': 'Access-Control-Allow-Origin',
        //   'token': '5E16EB288083A71C590FE809AA88C0C9'
        // }
      ).then(res => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    },

    test (index, row, item) {
      console.log(index, row, item)
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    // 表格查询
    format (val) {
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(
          this.search,
          '<font color="red">' + this.search + '</font>'
        )
      } else {
        return val
      }
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
.btn-type{
  //  margin-left: 10px;
}
</style>
