<!--  -->
<template>
  <div v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="messagecenter">
          <el-form :label-position="labelPosition" label-width="200px" :model="publicform">
            <el-form-item label="发布公告"></el-form-item>
            <el-form-item label="标题">
              <el-input v-model="publicform.title"></el-input>
            </el-form-item>
            <el-form-item label="发布者">
              <el-input v-model="publicform.id"></el-input>
            </el-form-item>

            <el-form-item label="内容">
              <el-input type="textarea" v-model="publicform.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即发布</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

      <!-- <el-dialog title="发布详情" :visible.sync="dialogTableVisible">
        <el-table :data="messagepanel">
          <el-table-column property="startdate" label="日期" width="150"></el-table-column>
          <el-table-column property="title" label="标题" width="150"></el-table-column>
          <el-table-column property="name" label="发布者" width="150"></el-table-column>
          <el-table-column property="content" label="内容"></el-table-column>
        </el-table>
      </el-dialog>-->
      <el-col :span="14">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>发布记录</span>
          </div>
                    <!-- <el-table :data="messagepanel.slice((currentPage-1)*pagesize,currentPage*pagesize)"> -->

          <el-table :data="messagepanel">
            <el-table-column property="startdate" label="日期" align="center"></el-table-column>
            <el-table-column property="title" label="标题" align="center"></el-table-column>
            <el-table-column property="name" label="发布者" align="center"></el-table-column>
            <el-table-column property="content" label="内容" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  @click="handleEdit(scope.$index, scope.row,scope.row.cjrid)"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row,scope.row.cjrid)"
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {reqMessage} from '@/api'
// import axios from 'axios'
export default {
  data () {
    return {
      QueryUrl: this.$store.state.BaseUrl,
      loading: true,
      // time: new Date(),
      dialogTableVisible: false,
      labelPosition: 'right',
      messagepanel: [],
      publicform: {
        title: '',
        id: '',
        content: ''
      }
    }
  },
  methods: {
    // 发布公告
    onSubmit () {
      let _this = this

      let ggbt = this.publicform.title
      let ggnr = this.publicform.content
      let cjrid = this.publicform.id
      console.log(cjrid)
      this.$axios
        .post(this.QueryUrl + '/notice/addnotice', {
          ggbt,
          ggnr,
          cjrid
        })
        .then(res => {
          console.log(res)
          _this.msgalert(res, _this)
        })
        .catch(e => {
          console.log(e)
        })
      // console.log('标题：' + this.publicform.title +
      //  '内容' + this.publicform.content)
    },
    // 编辑公告
    handleEdit (cjrid) {
      // let _this = this
      // this.$axios
      //   .post(this.QueryUrl + '/notice/addnotice', {
      //     ggbt,
      //     ggnr,
      //     cjrid
      //   })
      //   .then(res => {
      //     console.log(res)
      //     _this.msgalert(res, _this)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    httpGet () {
      let _this = this
      this.$axios
        .post(this.$store.state.BaseUrl + '/notice/querynotice')
        .then(res => {
          _this.loading = false
          _this.msgalert(res, _this)
          // this.messagepanel = res.data.messagepanel
          console.log(res)
        })
    },
    // 封装用户提示
    msgalert (res, _this) {
      if (res.data.code === 200) {
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.httpGet()
      } else {
        // 提示用户
        console.log(res.data.msg)
        this.$message.error(res.data.msg)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.httpGet()
    })
    // reqMessage().then((res) => {
    //   this.messagepanel = res.messagepanel
    // })
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
  width: 800px;
  float: right;
}
</style>
