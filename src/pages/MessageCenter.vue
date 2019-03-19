<!--  -->
<template>
  <div v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform" class="demo-form-inline">
          <el-form-item label="文章标题">
            <el-input v-model="searchform.ggbt" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="创建人员">
            <el-input v-model="searchform.cjr" placeholder="创建人员"></el-input>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-col :span="15">
              <el-date-picker
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
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="danger" @click="handleclear">清除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 发布-->
    <el-row :gutter="24">
      <el-col>
        <!-- <div class="messagecenter">
          <el-form :label-position="labelPosition" label-width="200px" :model="publicform">
            <el-form-item label="发布公告"></el-form-item>
            <el-form-item label="标题">
              <el-input v-model="publicform.title"></el-input>
            </el-form-item>

            <el-form-item label="内容">
              <el-input type="textarea" v-model="publicform.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即发布</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>-->
        <!-- v-show="!Editdiolog" -->
        <editor :editorContent.sync="editorContent"></editor>

        <el-button type="primary" @click="onSubmit()">立即发布</el-button>
        <el-button>取消</el-button>
        <el-button type="primary" @click="getContent()">测试</el-button>
      </el-col>

      <!-- 发布编辑 -->
      <el-dialog title="公告编辑" :visible.sync="Editdiolog">
        <!-- 引入富文本编辑 -->
        <editor :editorContent.sync="editorContent" ref="editor"></editor>

        <el-button type="primary" @click="geteditContent()">diolog测试</el-button>
        <el-button>取消</el-button>
      </el-dialog>

      <!-- 公告详情 -->
      <el-col class="box-card">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>发布记录</span>
          </div>
          <!-- <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"> -->
          <el-table :data="tableData">
            <el-table-column type="expand" label="点击查看内容" width="200">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="内容">
                    <span>{{ props.row.ggnr }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="有效标志" width="100">
              <template slot-scope="scope">
                <i v-if="scope.row.yxbz == 1">有效</i>
                <i v-else>无效</i>
              </template>
            </el-table-column>

            <el-table-column property="cjsj" label="日期" align="center"></el-table-column>
            <el-table-column property="ggbt" label="标题" align="center"></el-table-column>
            <el-table-column property="cjr" label="发布者" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row,scope.row.ggid)"
                >编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row.ggid)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :clearable="false"
            :current-page="currentPage"
            :page-sizes="[5,10]"
            :page-size="pagesize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {reqMessage} from '@/api'
// import axios from 'axios'
import Editor from '../components/editor'
export default {
  components: {
    Editor
  },
  data () {
    return {
      editval: '', // 每页编辑值
      editorContent: '', // 富文本内容
      path: 'MessageCenter',
      QueryUrl: this.$store.state.BaseUrl,
      loading: true,
      // time: new Date(),
      total: 0, // 总数
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      Editdiolog: false,
      labelPosition: 'right',
      tableData: [],
      // 发布框
      publicform: {
        title: '',
        // id: '',
        content: ''
      },
      selecttime: '', // 选择时间

      // 搜索
      searchform: {
        ggbt: '',
        // cjsj: '',
        cjr: '',
        starttime: '',
        endtime: ''
      },
      // 编辑框
      Editform: {
        ggbt: '',
        cjr: '0',
        ggnr: '',
        ggid: ''
      }
    }
  },
  methods: {
    // 控制搜索
    handleSearch () {
      this.searchform.starttime = this.selecttime[0]
      this.searchform.endtime = this.selecttime[1]
      this.searchform = {
        ggbt: this.searchform.ggbt,
        cjr: this.searchform.sjhm,
        starttime: this.searchform.starttime,
        endtime: this.searchform.endtime
      }
      this.handleDataGet()
    },
    handleclear () {
      this.searchform = {
        ggbt: '',
        // cjsj: '',
        cjr: '',
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
        this.QueryUrl + '/notice/querynotice',
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
        this.QueryUrl + '/notice/querynotice',
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
        this.QueryUrl + '/notice/querynotice',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    // 测试获取html
    getContent: function () {
      console.log(this.editorContent)
    },
    // 获取编辑的html
    geteditContent () {
      this.$refs.editor.geteditvale()
    },

    // 发布公告
    onSubmit () {
      let _this = this

      let ggbt = this.publicform.title
      let ggnr = this.publicform.content
      let cjrid = 0
      console.log(cjrid)
      this.$Haxios(
        this.QueryUrl + '/notice/addnotice',
        {
          ggbt,
          ggnr,
          cjrid
        },
        this.path,
        this.getCookie('token')
      )
        .then(res => {
          // 判断用户是否提交成功
          if (res.data.code === 200) {
            console.log(res.data)

            _this.handleDataGet()
            _this.msgalert(res)
            _this.publicform = {
              title: '',
              // id: '',
              content: ''
            }
          } else {
            _this.msgalert(res)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    Editformcancel () {
      this.Editdiolog = false
    },
    // 编辑公告
    handleEdit (index, row, ggid) {
      // this.$refs.editor.set(this.editorContent)
      setTimeout(() => {
        this.$refs.editor.editcreat(this.editorContent)
      }, 100)

      // console.log(ggid)
      // this.Editform = this.tableData[index]
      // this.Editform.ggid = ggid
      this.Editdiolog = true
    },
    // 提交编辑
    Editformupdate () {
      console.log(this.Editform.cjsj)
      let _this = this
      let ggid = this.Editform.ggid
      let ggbt = this.Editform.ggbt
      let ggnr = this.Editform.ggnr

      this.$Haxios(
        this.QueryUrl + '/notice/editnotice',
        {
          ggbt,
          ggnr,
          ggid
        },
        this.path,
        this.getCookie('token')
      )
        .then(res => {
          this.Editdiolog = false
          console.log(res)
          _this.handleDataGet()
          _this.msgalert(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 删除公告
    handleDelete (ggid) {
      let _this = this
      this.$Haxios(
        this.$store.state.BaseUrl + '/notice/delnotice',
        { ggid },
        this.path,
        this.getCookie('token')
      )
        .then(res => {
          console.log(res.data)
          _this.handleDataGet()
          _this.msgalert(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleDataGet()
    })
  }
}
</script>
<style scoped lang="scss">
.messagecenter {
  // width: 400PX;
  // float: left;
  text-align: center;
  margin: 0 auto;
}
.box-card {
  // width: 800px;
  float: right;
}
</style>
