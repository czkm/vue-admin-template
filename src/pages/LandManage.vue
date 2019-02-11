<template>
  <div class="box">

    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform" class="demo-form-inline">
          <el-form-item label="土地名称">
            <el-input v-model="searchform.tdmc" placeholder="土地名称"></el-input>
          </el-form-item>
          <el-form-item label="所在省份">
            <el-input v-model="searchform.szsf" placeholder="所在省份"></el-input>
          </el-form-item>
           <el-form-item label="所在城市">
            <el-input v-model="searchform.szcs" placeholder="所在城市"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-input v-model="searchform.szdq" placeholder="所在地区"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>

            <el-button type="danger" @click="handleclear">清除</el-button>
                 <el-button type="success" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%">

    <el-table-column
      prop="tdmc"
      label="土地名称"
      fixed>
    </el-table-column>
    <el-table-column
      prop="zmj"
      sortable
      label="总面积">
    </el-table-column>
    <el-table-column
      prop="kymj"
      sortable
      label="可用面积">
    </el-table-column>
    <el-table-column
      prop="qzmj"
      sortable
      label="起租面积">
    </el-table-column>
    <el-table-column
      prop="zddj"
      sortable
      label="起租单价">
    </el-table-column>
     <el-table-column
      prop="zdnx"
      sortable
      label="租地年限">
    </el-table-column>
      <el-table-column
      prop="szsf"
      sortable
      label="所在省份">
    </el-table-column>
     <el-table-column
      prop="szcs"
      sortable
      label="所在城市">
    </el-table-column>
      <el-table-column
      prop="szdq"
      sortable
      label="所在地区">
    </el-table-column>
     <el-table-column
      prop="xxdz"
      sortable
      label="详细地址">
    </el-table-column>
    <el-table-column
      prop="cjsj"
      sortable
      label="创建时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="xgsj"
      sortable
      label="修改时间"
       width="200">
    </el-table-column>
    <el-table-column
      prop="xgr"
      sortable
      label="修改人">
    </el-table-column>
    <el-table-column label="操作"      fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row,scope.row.nctdid)">编辑</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
<!-- 编辑dialog -->
    <el-dialog title="土地管理" :visible.sync="Editdialog">
      <el-form :model="Editform">

        <el-form-item label="土地名称" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.tdmc" ></el-input>
        </el-form-item>
    <el-form-item label="可用面积" :label-width="formLabelWidth">
       <el-tag type="info"> {{Editform.kymj}}㎡</el-tag>
        </el-form-item>
          <el-form-item label="总面积" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.zmj" >
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>

          <el-form-item label="起租面积" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.qzmj" >
            <template slot="append">㎡</template>
          </el-input>

        </el-form-item>
           <el-form-item label="租地单价" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.zddj" >
              <template slot="append">元</template>
          </el-input>
        </el-form-item>
          <el-form-item label="租地年限" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.zdnx" >
                <template slot="append">年</template>
          </el-input>
        </el-form-item>
          <el-form-item label="所在省份" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.szsf" ></el-input>
        </el-form-item>
          <el-form-item label="所在城市" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.szcs" ></el-input>
        </el-form-item>

          <el-form-item label="所在地区" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.szdq" ></el-input>
        </el-form-item>
          <el-form-item label="信息地址" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Editform.xxdz" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateEditform()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增dialog -->
    <el-dialog title="农场管理" :visible.sync="Adddialog">
      <el-form :model="Addform">

        <el-form-item label="农场名称" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.tdmc" ></el-input>
        </el-form-item>

          <el-form-item label="总面积" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.zmj" >
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>

          <el-form-item label="起租面积" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.qzmj" >
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
           <el-form-item label="租地单价" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.zddj" >
              <template slot="append">元</template>
          </el-input>
        </el-form-item>
          <el-form-item label="租地年限" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.zdnx" >
                <template slot="append">年</template>
          </el-input>
        </el-form-item>
          <el-form-item label="所在省份" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.szsf" ></el-input>
        </el-form-item>
          <el-form-item label="所在城市" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.szcs" ></el-input>
        </el-form-item>

          <el-form-item label="所在地区" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.szdq" ></el-input>
        </el-form-item>
          <el-form-item label="信息地址" :label-width="formLabelWidth">
          <el-input class="sortinput" v-model="Addform.xxdz" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateAddform()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      path: 'LandManage',
      xgrid: this.$store.state.xgrid, // 修改人id
      QueryUrl: this.$store.state.BaseUrl,
      loading: true,
      Editdialog: false,
      Adddialog: false,

      formLabelWidth: '150px',
      Editform: {

      },
      Addform: {

      },
      total: 0,
      currentPage: 1, // 初始页
      pagesize: 5, //    每页的数据
      tableData: [],
      searchform: {
        tdmc: '',
        szsf: '',
        szcs: '',
        szdq: ''

      }

    }
  },
  methods: {

    // 显示编辑界面
    handleEdit: function (index, row, nctdid) {
      this.Editform = this.tableData[index]
      this.Editdialog = true
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    cancel () {
      this.Editdialog = false
      this.Adddialog = false
      this.$refs.upload.clearFiles()
    },
    updateEditform () {
      this.loading = true
      let _this = this
      let nctdid = this.Editform.nctdid
      let tdmc = this.Editform.tdmc
      let zmj = this.Editform.zmj
      let kymj = this.Editform.kymj
      let qzmj = this.Editform.qzmj
      let zddj = this.Editform.zddj
      let zdnx = this.Editform.zdnx
      let szsf = this.Editform.szsf
      let szcs = this.Editform.szcs
      let szdq = this.Editform.szdq
      let xxdz = this.Editform.xxdz
      let xgrid = this.xgrid
      this.$Haxios(this.QueryUrl + '/farmland/editfarm', {
        nctdid,
        tdmc,
        zmj,
        kymj,
        qzmj,
        zddj,
        zdnx,
        szsf,
        szcs,
        szdq,
        xxdz,
        xgrid

      }, this.path, this.getCookie('token'))
        .then(res => {
          if (res.data.code === 200) {
            console.log(res.data)
            _this.Editdialog = false
            _this.handleDataGet()
            _this.msgalert(res)

            _this.Editform = {}
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleSearch () {
      let _this = this
      this.loading = true
      let tdmc = _this.searchform.tdmc
      let szsf = _this.searchform.szsf
      let szcs = _this.searchform.szcs
      let szdq = _this.searchform.szdq
      // 请求头带参
      this.$Haxios(this.QueryUrl + '/farmland/queryfarm', {
        tdmc,
        szsf,
        szcs,
        szdq

      }, this.path, this.getCookie('token'))
        .then((res) => {
          console.log(res.rows)
          _this.tableData = res.data.rows
          _this.loading = false
          _this.total = res.data.total
          _this.page = res.data.page
          _this.limit = res.data.limit
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleclear () {
      this.searchform = {
        tdmc: '',
        szsf: '',
        szcs: '',
        szdq: ''
      }
      this.handleDataGet()
    },
    handleAdd () {
      this.Adddialog = true
    },
    updateAddform () {
      this.loading = true
      let _this = this
      let tdmc = this.Addform.tdmc
      let zmj = this.Addform.zmj
      let kymj = 0
      let qzmj = this.Addform.qzmj
      let zddj = this.Addform.zddj
      let zdnx = this.Addform.zdnx
      let szcs = this.Addform.szcs
      let szsf = this.Addform.szsf
      let szdq = this.Addform.szdq
      let xxdz = this.Addform.xxdz
      let xgrid = this.xgrid
      this.$Haxios(this.$store.state.BaseUrl + '/farmland/addfarm', {
        tdmc,
        zmj,
        kymj,
        qzmj,
        zddj,
        zdnx,
        szsf,
        szcs,
        szdq,
        xgrid,
        xxdz

      }, this.path, this.getCookie('token'))
        .then(res => {
          // 判断用户是否提交成功
          if (res.data.code === 200) {
            console.log(res.data)
            _this.Adddialog = false
            _this.handleDataGet()
            _this.msgalert(res)
            _this.Addform = {}
          } else {
            _this.msgalert(res)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 页面加载获取初始值
    handleDataGet () {
      // 页面 限制 路径 路由路径 token

      this.PageAxios(1, this.pagesize, this.QueryUrl + '/farmland/queryfarm', this.path, this.getCookie('token'), this.searchform)
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      this.PageAxios(1, size, this.QueryUrl + '/farmland/queryfarm', this.path, this.getCookie('token'), this.searchform)
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      this.PageAxios(currentPage, this.pagesize, this.QueryUrl + '/farmland/queryfarm', this.path, this.getCookie('token'), this.searchform)
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
.count{
  text-align: right
}
.sortinput{
  width: 200px;
    }
</style>
