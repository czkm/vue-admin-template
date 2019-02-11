<template>
  <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform">
          <el-form-item label="土地编号">
            <el-input v-model="searchform.tdbh" placeholder="土地编号"></el-input>
          </el-form-item>

          <el-form-item label="土地状态">
            <el-input v-model="searchform.tdzt" placeholder="土地状态"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch()">查询</el-button>
            <el-button type="danger" @click="handleclear()">清除</el-button>
            <el-button type="success" @click="handladd()">添加土地</el-button>
            <el-button type="success" @click=" Batchadd ()">批量添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 主界面 -->
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="landplanid" label="土地规划ID" width="150"></el-table-column> -->
        <el-table-column prop="tdbh" label="土地编号"></el-table-column>
        <el-table-column prop="ncmc" label="农场名称"></el-table-column>
        <el-table-column prop="zlr" label="租贷人"></el-table-column>
        <el-table-column prop="tdmj" label="土地面积"></el-table-column>
        <el-table-column label="土地状态">
          <template slot-scope="scope">
            <div v-if="scope.row.tdzt === '3'">锁定中</div>
            <div v-else-if="scope.row.tdzt === '1'">待出租</div>
            <div v-else-if="scope.row.tdzt === '2'">已出租</div>
            <div v-else>土地状态无值</div>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="tdzt" label="土地状态" ></el-table-column> -->
        <el-table-column prop="cjsj" label="创建时间"></el-table-column>
        <el-table-column prop="xgsj" label="修改时间"></el-table-column>
        <el-table-column prop="xgr" label="修改人"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,scope.row.tdghid,scope.row.nctdid)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,scope.row.tdghid)"
            >删除</el-button>
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
    <!-- 新建编辑 -->
    <el-dialog title="土地信息" :visible.sync="Editdialog">
      <el-form :model="Editform">
        <!-- <el-form-item label="土地规划ID" :label-width="formLabelWidth">
          <el-input v-model="Editform.tdghid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="农场土地ID" :label-width="formLabelWidth">
          <el-input v-model="Editform.nctdid" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="土地编号" :label-width="formLabelWidth">
          <el-input v-model="Editform.tdbh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起租面积" :label-width="formLabelWidth">
          <el-input v-model="Editform.tdmj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="土地状态" :label-width="formLabelWidth">
          <!-- <el-input v-model="Editform.tdzt" auto-complete="off"></el-input> -->
          <el-select v-model="selectvalue" placeholder="请选择">
            <el-option
              v-for="item in selecttdzt"
              :key="item.selectvalue"
              :label="item.label"
              :value="item.selectvalue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateEditform()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 土地添加 -->
    <el-dialog title="土地信息" :visible.sync="Adddialog">

      <el-form :model="Addform">
        <el-form-item
          label="农场土地ID"
          :label-width="formLabelWidth"
          :rules="[
      { required: true, message: '农场土地ID'},
       { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ]"
        >
          <el-input v-model="Addform.nctdid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="土地编号" :label-width="formLabelWidth">
          <el-input v-model="Addform.tdbh" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="起租面积" :label-width="formLabelWidth">
          <el-input v-model="Addform.tdmj" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="土地状态" :label-width="formLabelWidth">
          <el-select v-model="selectvalue" placeholder="请选择">
            <el-option
              v-for="item in selecttdzt"
              :key="item.selectvalue"
              :label="item.label"
              :value="item.selectvalue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateAddform()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 批量添加土地 -->

    <el-dialog title="土地信息" :visible.sync="Batchdialog">
      <el-form :model="Batchform">
        <el-form-item label="农场土地ID" :label-width="formLabelWidth">
          <el-select v-model="Batchformnctdid" placeholder="请选择">
            <el-option
              v-for="item in selectname"
              :key="item.nctdid"
              :label="item.tdmc"
              :value="item.nctdid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域号" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Batchform.prefixno" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="土地面积" :label-width="formLabelWidth">
          <el-tag>{{Batchform.landnumber*10}}</el-tag>
        </el-form-item>
        <el-form-item label="土地份数" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Batchform.landnumber" auto-complete="off">
            <template slot="append">10/㎡</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateBatchform()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      path: 'LandDetail',
      selecttdzt: [
        {
          selectvalue: '1',
          label: '待出租'
        },
        {
          selectvalue: '2',
          label: '已出租'
        },
        {
          selectvalue: '3',
          label: '锁定中'
        }
      ],
      selectvalue: '', // 选择土地状态
      selectname: [
        {
          nctdid: '0',
          tdmc: '其他农场'
        }
      ],
      Batchformnctdid: '0', // 选择农场名称

      loading: true,

      xgrid: this.$store.state.xgrid, // 修改人id
      QueryUrl: this.$store.state.BaseUrl,
      searchform: {
        tdbh: ''
      },
      total: 0, // 总数
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      Editdialog: false,
      Adddialog: false,
      Batchdialog: false,
      tableData: [],
      formLabelWidth: '100px',
      sortformLabelWidth: '50px',
      Editform: {
        tdghid: '',
        nctdid: ''
      },
      Addform: {},
      // 批量表格
      Batchform: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleDataGet()
    })
  },
  methods: {
    // 打开编辑框
    handleEdit (index, row, tdghid, nctdid) {
      this.Editform = {
        tdghid,
        nctdid
      }
      this.Editform = this.tableData[index]
      this.currentIndex = index
      this.Editdialog = true
    },
    // 添加土地
    handladd () {
      this.Adddialog = true
    },
    // 批量添加土地
    Batchadd () {
      // 获取农场名称

      let _this = this
      // 清空数组
      this.selectname = []
      this.Batchdialog = true
      this.$Haxios(
        this.QueryUrl + '/farmland/select',
        {},
        this.path,
        this.getCookie('token')
      )
        .then(res => {
          console.log(res.data.result)
          let nameresult = res.data.result
          for (let index = 0; index < nameresult.length; index++) {
            console.log(nameresult[index])
            _this.selectname.push(nameresult[index])
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 删除土地规划
    handleDelete (index, row, tdghid) {
      console.log(tdghid)
      let _this = this
      this.$Haxios(
        this.QueryUrl + '/farmland/delland',
        {
          tdghid
        },
        this.path,
        this.getCookie('token')
      ).then(res => {
        console.log(res)

        _this.handleDataGet()
        _this.msgalert(res)
        _this.loading = false
      })
    },
    // 提交土地规划修改
    updateEditform () {
      console.log(this.selectvalue)
      let _this = this
      let tdghid = this.Editform.tdghid
      let nctdid = this.Editform.nctdid
      let tdbh = this.Editform.tdbh
      let tdmj = this.Editform.tdmj
      let tdzt = this.selectvalue
      let xgrid = this.$store.state.xgrid
      this.$Haxios(
        this.QueryUrl + '/farmland/editland',
        {
          xgrid,
          tdghid,
          nctdid,
          tdbh,
          tdmj,
          tdzt
        },
        this.path,
        this.getCookie('token')
      )

        .then(res => {
          console.log(res)
          _this.selectvalue = ''

          _this.Editdialog = false
          _this.handleDataGet()
          _this.msgalert(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 提交添加土地
    updateAddform () {
      let _this = this
      this.loading = true
      let nctdid = this.Addform.nctdid
      let tdbh = this.Addform.tdbh
      let tdmj = this.Addform.tdmj
      let tdzt = this.selectvalue
      let xgrid = this.$store.state.xgrid
      this.$Haxios(
        this.QueryUrl + '/farmland/addland',
        {
          xgrid,
          nctdid,
          tdbh,
          tdmj,
          tdzt
        },
        this.path,
        this.getCookie('token')
      ).then(res => {
        console.log(res)
        _this.selectvalue = ''
        _this.Adddialog = false
        _this.handleDataGet()
        _this.msgalert(res)
        _this.loading = false
      })
    },
    // 批量提交土地
    updateBatchform () {
      let _this = this
      this.loading = true
      let nctdid = this.Batchformnctdid
      let landnumber = this.Batchform.landnumber
      let tdmj = this.Batchform.landnumber * 10
      let prefixno = this.Batchform.prefixno
      let xgrid = this.$store.state.xgrid
      this.$Haxios(
        this.QueryUrl + '/farmland/batch/add/land',
        {
          xgrid,
          nctdid,
          landnumber,
          tdmj,
          prefixno
        },
        this.path,
        this.getCookie('token')
      ).then(res => {
        console.log(res)
        _this.selectvalue = ''
        _this.Batchdialog = false
        _this.handleDataGet()
        _this.msgalert(res)
        _this.loading = false
      })
    },

    cancel () {
      this.Editdialog = false
      this.Adddialog = false
      this.Batchdialog = false
    },

    handleDataGet () {
      this.PageAxios(
        1,
        this.pagesize,
        this.QueryUrl + '/farmland/queryland',
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
        this.QueryUrl + '/farmland/queryland',
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
        this.QueryUrl + '/farmland/queryland',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    handleSearch () {
      let _this = this
      this.loading = true
      let tdbh = this.searchform.tdbh
      let tdzt = this.searchform.tdzt

      this.$Haxios(
        this.QueryUrl + '/farmland/queryland',
        {
          tdbh,
          tdzt
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
    // 清除搜索
    handleclear () {
      this.searchform = {
        scmc: ''
      }
      this.handleDataGet()
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
  .sortinput {
    width: 250px;
  }
}
</style>
