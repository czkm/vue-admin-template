<template>
  <div class="box" v-loading="loading" element-loading-text="拼命加载中">

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="nc" label="蔬菜名称"></el-table-column>
      <el-table-column label="蔬菜略缩主图" >
        <template slot-scope="scope">
          <img :src="scope.row.headimg" alt style="width: 50px;height: 50px">
        </template>
      </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
     <!-- 新建编辑 -->
    <el-dialog title="土地信息" :visible.sync="Editdialog">
      <el-form :model="Editform">

            <el-form-item label=" 预览" :label-width="formLabelWidth">
          <!-- 蔬菜轮播预览 -->
          <div v-for="item in Editform.sczplist" :key="item.id">
            <img
              :src="item.zpurl"
              alt
              style="width: 100px;height: 100px; float:left; padding:0 5px "
            >
          </div>
        </el-form-item>
           <el-form-item label="蔬菜轮播图" :label-width="formLabelWidth">
          <!-- html组件代码 -->
          <el-upload
            :action="uploadimgs()"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"

            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-button class="submitbtn" @click="subPicForm()">提交上传</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateEditform()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
// import Headxiaos from '../api/ajax.js'

export default {
  data () {
    return {
      path: 'VegetableMiniatures ',
      loading: true,
      QueryUrl: this.$store.state.BaseUrl + '/vegetable/queryvegetable',
      Editdialog: false,
      xgrid: this.$store.state.xgrid, // 修改人id

      ImgFormDate: '',
      formLabelWidth: '100px',
      total: 0,
      currentPage: 1, // 初始页
      pagesize: 5, //    每页的数据
      tableData: [],
      Editform: {}
    }
  },
  methods: {
    uploadimgs () {
      return this.QueryUrl + '/upload/uploadimgs'
    },
    // 控制编辑
    handleEdit (index, row) {
      this.Editform = this.tableData[index]
      this.currentIndex = index
      this.Editdialog = true
    },
    cancel () {
      this.Editdialog = false
    },
    // 控制上传图片
    // 添加图片路径
    uploadFile (file) {
      this.ImgFormDate.append('file', file.file)
    },
    // 编辑图片上传
    subPicForm () {
      this.uploadloading = true
      let _this = this
      this.ImgFormDate = new FormData()
      this.$refs.upload.submit()
      // this.ImgFormDate.append('imgs', '12133')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post(this.QueryUrl + '/upload/uploadimgs', this.ImgFormDate, config)
        .then(res => {
          if (res.data.code === 200) {
            _this.msgalert(res)
            _this.Editform.filelist = res.data.result.zpurls
            console.log(_this.Editform.filelist)
            _this.uploadloading = false
          } else {
            _this.msgalert(res)
            _this.uploadloading = false
          }
        })
        .catch(res => {
          console.log(res)
          this.$message.error(res.data.msg)
        })
    },

    // 页面加载获取初始值
    handleDataGet () {
      // 页面 限制 路径 路由路径 token

      this.PageAxios(1, this.pagesize, this.QueryUrl, this.path, this.getCookie('token'))
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      this.PageAxios(1, size, this.QueryUrl, this.path, this.getCookie('token'))
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      this.PageAxios(currentPage, this.pagesize, this.QueryUrl, this.path, this.getCookie('token'))
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
.count {
  text-align: right;
}
.sortinput {
    width: 250px;
  }
</style>
