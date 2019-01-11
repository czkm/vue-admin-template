<template>
  <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">

      <!-- <el-input v-model="search" clearable style="width: 200px" placeholder="请输入内容"/>
      <el-button type="primary" @click="handleSearch()">搜索</el-button> -->
      <el-button type="success" @click="add()">添加蔬菜</el-button>
      <el-button type="danger" @click="deleteAll()">批量刪除</el-button>
        <div class="searchitem">
          <el-input  v-model="search"
              clearable
              style="width: 200px"
              placeholder="请输入内容"/>
          <el-button type="primary" @click="handleSearch()">搜索</el-button>
        </div>
    </div>
    <!-- 主界面 -->
    <div class="tableMain">

      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column label="图片"  width="200">
        <template slot-scope="scope">
          <img  :src="scope.row.imgPath" alt="" style="width: 150px;height: 150px">
        </template>
        </el-table-column>
        <el-table-column prop="name" label="蔬菜名"  width="150"></el-table-column>

        <el-table-column  label="生产周期" width="150" >
           <template slot-scope="scope">
            <div size="medium" v-html="(scope.row.pcycle + '天')"/>
          </template>
        </el-table-column>
          <el-table-column  label="产能"  width="150">
           <template slot-scope="scope">
            <div size="medium" v-html="(scope.row.output)"/>
          </template>
        </el-table-column>
            <el-table-column  label="种植季节"  width="150">
           <template slot-scope="scope">
            <div size="medium" v-html="(scope.row.plantseason)"/>
          </template>
        </el-table-column>
        <el-table-column prop="effect" label="功效" ></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <!-- 新建编辑 -->
    <el-dialog title="蔬菜基本信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item class="formitem" label="蔬菜名称" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="formitem"  label="蔬菜产能" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.output"></el-input>
        </el-form-item>
        <el-form-item label="生产周期" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.pcycle"></el-input>
        </el-form-item>
        <el-form-item label=" 蔬菜功效与作用" :label-width="formLabelWidth">
          <el-input type="textarea" class="newinput" v-model="form.effect"></el-input>
        </el-form-item>
        <el-form-item label="蔬菜轮播图" :label-width="formLabelWidth">
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="5"
            :multiple="true"
            accept="image/jpeg,image/gif,image/png"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :auto-upload ="false"
            :file-list="fileList"
            >
            <i class="el-icon-plus"></i>
          </el-upload>

          <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="imgPath"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload> -->
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
         <!-- <template slot-scope="scope">
        <el-button  type="primary" @click="update(scope.$index, scope.row)">确定</el-button>
        </template> -->
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// import axios from 'axios'
// import { reformat } from '../common/js/reformat'

export default {
  data () {
    return {
      fileList: [],
      multipleSelection: [],
      // isIndeterminate: true,

      baseUrl: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example',
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      loading: true,
      // tableData: '',
      tableData: [
        {
          imgPath: '../../static/img/userinfo.jpg',
          name: '白菜',
          pcycle: '180',
          output: '50斤/10㎡',
          plantseason: '夏季',
          effect: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        }, {
          imgPath: '../../static/img/userinfo.jpg',
          name: '白菜',
          pcycle: '180',
          output: '50斤/10㎡',
          plantseason: '秋季',

          effect: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        }, {
          imgPath: '../../static/img/userinfo.jpg',
          name: '卷心菜',
          pcycle: '160',
          output: '50斤/10㎡',
          plantseason: '春季',
          effect: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        }
      ],

      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      currentIndex: ''
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    //   this.httpGet()
    }, 1000)
    // this.getdata()
  },
  methods: {
    // showTime () {
    //   this.$alert(this.value6, '起止时间', {
    //     confirmButtonText: '确定',
    //     callback: action => {
    //       this.$message({
    //         type: 'info',
    //         message: '已显示'
    //       })
    //     }
    //   })
    // },
    httpGet () {
      let _this = this
      this.$axios
        .post(this.baseUrl + '/getrole')
        .then(function (res) {
          console.log(res)
          _this.tableData = res.data.tableData
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 控制启用
    change () {
    //   console.log(this.status)
    //   this.form.status = this.status
      console.log(this.form.status)
    },
    add () {
      this.form = {
        name: '',
        pcycle: '',
        output: '',
        effect: '',
        fileList: []
      }
      this.dialogFormVisible = true
    },
    update () {
      // 格式化时间
      // console.log(this.imgPath)
      console.log(this.fileList)
      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      let deletename = this.tableData[index].name
      this.$confirm(`将${deletename}删除，`, '删除蔬菜', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    cancel () {
      this.dialogFormVisible = false
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleSearch () {
      console.log(this.search)
    },
    // 控制全选

    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteAll () {
      console.log(this.multipleSelection)
    },
    // 控制图片上传

    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    submitUpload () {
      this.$refs.upload.submit()
      // console.log(fileList)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    }
    // handlePreview (file) {
    //   console.log(file)
    // }
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
}

.searchitem{
  float: right
}
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
  .checkAll{
      width: 100%;
  }
  .box-cardl {
    width: 400px;
    float: left
  }
  .box-cardr {
    width: 400px;
    float: right
  }
  .newinput{
       width: 800px;
  }
</style>
