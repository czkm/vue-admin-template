<template>
  <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="searchform" class="demo-form-inline">
          <el-form-item label="蔬菜名">
            <el-input v-model="searchform.scmc" placeholder="请输入蔬菜名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="danger" @click="handleclear">清除</el-button>
            <el-button type="success" @click="handladd()">添加蔬菜</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- </div> -->
    <!-- 主界面 -->
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="scmc" label="蔬菜名" width="150"></el-table-column>

        <el-table-column prop="scms" label="蔬菜描述" width="250"></el-table-column>
        <el-table-column label="烹饪方式">
          <template slot-scope="scope">
            <el-col :span="6" v-for="(cook, index) in scope.row.cook" :key="index">
              <div class="cookbox" type="info">
                <div class="cooktitle">{{scope.row.cook[index].title}}</div>
              </div>
              <div class="cookimg">
                <img :src="scope.row.cook[index].src" alt style="width: 150px;height: 150px">
              </div>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row,scope.row.scxxid,scope.row.sczplist,scope.row.scslt)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,scope.row.scxxid)"
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
    <el-dialog title="蔬菜基本信息" :visible.sync="Editdialog">
      <el-form
        :model="Editform"
        :rules="rules"
        ref="Editform"
        v-loading="uploadloading"
        element-loading-text="在传了，别催"
      >
        <el-form-item class="formitem" label="蔬菜名称" :label-width="formLabelWidth" prop="scmc">
          <el-input class="inputclass" v-model="Editform.scmc"></el-input>
        </el-form-item>

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
            :multiple="multiple"
            :action="uploadimgs()"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadFile"
            :on-change="imgsize"
            ref="upload"

          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-button class="submitbtn" @click="subPicForm()">提交上传</el-button>
        </el-form-item>

        <!-- 蔬菜缩略预览 -->
        <el-form-item label=" 缩略图预览" :label-width="formLabelWidth">
          <div>
            <img
              :src="Editform.scslt"
              alt
              style="width: 100px;height: 100px; float:left; padding:0 5px "
            >
          </div>
        </el-form-item>

        <el-form-item label="蔬菜缩略图" :label-width="formLabelWidth">
          <!-- html组件代码 -->
          <el-upload
            :multiple="false"
            :action="uploadimgs()"
            list-type="picture-card"
            :auto-upload="false"
            :http-request="uploadminiFile"
            :limit="1"
            ref="miniupload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-button class="submitbtn" @click="subMINI()">提交上传</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="Editformupdate('Editform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- fa建添加 -->
    <el-dialog title="蔬菜基本信息" :visible.sync="Adddialog">
      <el-form
        :model="Addform"
        :rules="rules"
        ref="Addform"
        v-loading="uploadloading"
        element-loading-text="在传了，别催"
      >
        <el-form-item class="formitem" label="蔬菜名称" :label-width="formLabelWidth" prop="scmc">
          <el-input class="inputclass" v-model="Addform.scmc"></el-input>
        </el-form-item>

        <el-form-item class="formitem" label="蔬菜描述" :label-width="formLabelWidth" prop="sczl">
          <el-input class="inputclass" v-model.number="Addform.sczl"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="烹饪方式与图片" :label-width="formLabelWidth">
              <el-input class="cookname" v-model="Addform.cookinput0"></el-input>
              <el-upload
                :multiple="multiple"
                :action="uploadimg()"
                list-type="picture-card"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="imgsize"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-button class="submitbtn" @click="subAddForm()">提交上传</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label-width="formLabelWidth">
              <el-input class="cookname" v-model="Addform.cookinput1"></el-input>
              <el-upload
                :multiple="multiple"
                :action="uploadimg()"
                list-type="picture-card"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="imgsize"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-button class="submitbtn" @click="subAddForm()">提交上传</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item :label-width="formLabelWidth">
              <el-input class="cookname" v-model="Addform.cookinput2"></el-input>
              <el-upload
                :multiple="multiple"
                :action="uploadimg()"
                list-type="picture-card"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="imgsize"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-button class="submitbtn" @click="subAddForm()">提交上传</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label-width="formLabelWidth">
              <el-input class="cookname" v-model="Addform.cookinput3"></el-input>
              <el-upload
                :multiple="multiple"
                :action="uploadimg()"
                list-type="picture-card"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="imgsize"
                ref="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-button class="submitbtn" @click="subAddForm()">提交上传</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="Addformupdate('Addform')">确 定</el-button>
         <el-button type="primary" @click="test()">测试</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      scmc: {}, // 搜索对象
      searchData: {}, // 传递后台查询对象
      path: 'VegetableWish',
      multiple: false,
      ImgFormDate: '',
      MiniImgFormDate: '',
      xgrid: this.$store.state.xgrid, // 修改人id
      QueryUrl: this.$store.state.BaseUrl,
      loading: false, // true,
      uploadloading: false,
      total: 0, // 总数
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      // tableData: [],
      tableData: [
        {
          scmc: '1',
          scms: '1',
          cook: [
            { title: 'lsdsdadasdasdasdasdasdas', src: '1321313' },
            { title: '44', src: '1321313' },
            { title: '33', src: '1321313' }
          ]
        }
      ],
      // 搜索
      searchform: {
        scmc: ''
      },
      Editdialog: false,
      Adddialog: false,

      formLabelWidth: '150px',
      Editform: {
        scxxid: '',
        startzzjj: '', // 分割种植季节
        endzzjj: '',
        startsczq: '', // 分割生产周期
        endsczq: '',
        filelist: [], // 保存图片路径
        sczplist: [], // 略缩图路径
        Miniscslt: ''
      },
      Addform: {

        cookinput0: '',
        cookinput1: '',
        cookinput2: '',
        cookinput3: '',

        scmc: '',
        scxxid: '',
        startzzjj: '', // 分割种植季节
        endzzjj: '',
        startsczq: '', // 分割生产周期
        endsczq: '',
        Miniscslt: '',
        filelist: [] // 保存图片路径
      },
      // 新建表单校验规则
      rules: {
        scmc: [
          { required: true, message: '请输入蔬菜名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        sczl: [
          { required: true, message: '请输入蔬菜种类', trigger: 'blur' },
          { type: 'number', message: '蔬菜种类必须为数字值' }
        ],
        startzzjj: [
          { required: true, message: '请输入蔬菜种植季节', trigger: 'blur' },
          { type: 'number', message: '蔬菜种植季节必须为数字值' }
          // { min: 1, max: 12, message: '月份需要在1到12月', trigger: 'blur' }
        ],
        startsczq: [
          { required: true, message: '请输入蔬菜生产周期', trigger: 'blur' },
          { type: 'number', message: '蔬菜种植生产周期必须为数字值' }
        ],
        cnj: [
          { required: true, message: '请输入蔬菜产能', trigger: 'blur' },
          { type: 'number', message: '产能必须为数字值' }
        ],
        cnpf: [
          { required: true, message: '请输入蔬菜产能斤', trigger: 'blur' },
          { type: 'number', message: '产能斤必须为数字值' }
        ],
        tjzzmj: [
          { required: true, message: '请输入蔬菜产能斤', trigger: 'blur' },
          { type: 'number', message: '产能斤必须为数字值' }
        ],
        scjj: [{ required: true, message: '蔬菜简介不能为空', trigger: 'blur' }]
      },
      isimgMAX: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.handleDataGet()
    })
  },
  methods: {
    // 显示添加dialog
    handladd () {
      this.Adddialog = true
      // 初始化form
      this.Addform = {
        scmc: '',
        scxxid: '',
        startzzjj: '', // 分割种植季节
        endzzjj: '',
        startsczq: '', // 分割生产周期
        endsczq: '',
        filelist: [] // 保存图片路径
      }
    },
    uploadimgs () {
      return this.QueryUrl + '/upload/uploadimgs'
    },
    uploadimg () {
      return this.QueryUrl + '/upload/imgupload'
    },
    // 判断图片大小
    imgsize (file, fileList) {
      console.log(fileList)
      var imgsize = 0
      for (let index = 0; index < fileList.length; index++) {
        imgsize += fileList[index].size
        console.log(imgsize)
      }
      if (imgsize > 1024 * 1024 * 2) {
        this.isimgMAX = true
      } else {
        this.isimgMAX = false
      }
    },
    handleEdit (index, row, scxxid, sczplist, scslt) {
      this.Editform = this.tableData[index]
      let zzjj = this.tableData[index].zzjj.split('-')
      let sczq = this.tableData[index].sczq.split('-')
      // 分割生产周期，分割种植季节
      this.Editform.startzzjj = zzjj[0] * 1
      this.Editform.endzzjj = zzjj[1] * 1
      this.Editform.startsczq = sczq[0] * 1
      this.Editform.endsczq = sczq[1] * 1
      this.Editform.scxxid = scxxid

      // 获取素菜略缩图
      this.Editform.sczplist = sczplist
      this.Editform.scslt = scslt

      console.log('略缩图列表' + sczplist)
      console.log('蔬菜略缩图' + scslt)

      this.Editdialog = true
    },
    // 删除蔬菜轮播
    handleDelete (index, row, scxxid) {
      let _this = this
      this.$Haxios(
        this.QueryUrl + '/vegetable/delvegetable',
        {
          scxxid
        },
        this.path,
        this.getCookie('token')
      )
        .then(res => {
          console.log(res)
          _this.msgalert(res)
          _this.handleDataGet()
        })
        .catch(e => {
          console.log(e)
        })
      // 刷新界面
    },
    // 关闭对话框
    cancel () {
      this.Editdialog = false
      this.Adddialog = false
      this.$refs.upload.clearFiles()
      this.$refs.miniupload.clearFiles()
    },
    handleDataGet () {
      console.log(this.searchData)
      this.PageAxios(
        1,
        this.pagesize,
        this.QueryUrl + '/vegetable/queryvegetable',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    // 控制页面页数
    handleSizeChange: function (size) {
      console.log(this.searchform)

      console.log(size)
      console.log('页面变化')
      this.PageAxios(
        this.currentPage,
        size,
        this.QueryUrl + '/vegetable/queryvegetable',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    // 点击第几页
    handleCurrentChange: function (currentPage) {
      console.log(this.searchform)

      this.PageAxios(
        currentPage,
        this.pagesize,
        this.QueryUrl + '/vegetable/queryvegetable',
        this.path,
        this.getCookie('token'),
        this.searchform
      )
    },
    handleSearch () {
      this.searchData = { scmc: this.searchform.scmc }
      this.handleDataGet()
    },

    // 清除搜索
    handleclear () {
      this.searchform = {
        scmc: ''
      }
      this.handleDataGet()
    },

    // 添加图片路径
    uploadFile (file) {
      this.ImgFormDate.append('file', file.file)
    },
    //  略缩图路径
    uploadminiFile (minifile) {
      this.MiniImgFormDate.append('img', minifile.file)
    },
    // 编辑图片上传
    subPicForm () {
      if (this.isimgMAX) {
        this.$message({
          message: '传那么大干嘛，2m就好啦',
          type: 'error'
        })
        return false
      }
      this.uploadloading = true
      let _this = this
      this.ImgFormDate = new FormData()
      console.log(this.ImgFormDate)
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
            // _this.$message({
            //   message: res.data.msg,
            //   type: 'success'

            // })
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
    // 新建图片上传
    subAddForm () {
      if (this.isimgMAX) {
        this.$message({
          message: '传那么大干嘛，2m就好啦',
          type: 'error'
        })

        return false
      }
      this.uploadloading = true
      let _this = this
      this.ImgFormDate = new FormData()
      this.$refs.upload.submit()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post(this.QueryUrl + '/upload/uploadimgs', this.ImgFormDate, config)
        .then(res => {
          // 用户上传成功
          if (res.data.code === 200) {
            // _this.$message({
            //   message: res.data.msg,
            //   type: 'success'

            // })
            _this.msgalert(res)
            _this.Addform.filelist = res.data.result.zpurls
            console.log(_this.Addform.filelist)
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
    // 缩略图上传
    subMINI () {
      if (this.isimgMAX) {
        this.$message({
          message: '传那么大干嘛，2m就好啦',
          type: 'error'
        })
        return false
      }
      this.uploadloading = true
      let _this = this
      this.MiniImgFormDate = new FormData()
      this.$refs.miniupload.submit()
      // this.ImgFormDate.append('imgs', '12133')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios
        .post(this.QueryUrl + '/upload/imgupload', this.MiniImgFormDate, config)
        .then(res => {
          if (res.data.code === 200) {
            // _this.$message({
            //   message: res.data.msg,
            //   type: 'success'

            // })
            _this.msgalert(res)
            _this.Editform.Miniscslt = res.data.result.imgurl
            _this.Addform.Miniscslt = res.data.result.imgurl

            console.log(_this.Editform.Miniscslt)
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
    // 编辑dialog提交
    Editformupdate (Editform) {
      this.loading = true
      let _this = this
      this.$refs[Editform].validate(valid => {
        if (valid) {
          console.log('Editformpdate成功')
          let scxxid = this.Editform.scxxid
          let zzjj = `${this.Editform.startzzjj}-${this.Editform.endzzjj}`
          let sczq = `${this.Editform.startsczq}-${this.Editform.endsczq}`
          let scmc = this.Editform.scmc
          let sczl = this.Editform.sczl
          let cnj = this.Editform.cnj
          let cnpf = this.Editform.cnpf
          let scjj = this.Editform.scjj
          let tjzzmj = this.Editform.tjzzmj
          // let scslt = this.Editform.Miniscslt
          // 判断是否有修改图片
          // 遍历
          var sczplist = []
          for (let index = 0; index < this.Editform.sczplist.length; index++) {
            let sczp = this.Editform.sczplist[index].zpurl
            sczplist.push(sczp)
          }
          // 不修改图片则传回原略缩图
          let zpurls = this.Editform.filelist
            ? this.Editform.filelist
            : sczplist

          // 不修改图片则传回原略缩图
          let scslt = this.Editform.Miniscslt
            ? this.Editform.Miniscslt
            : this.Editform.scslt
          //
          let xgrid = this.xgrid

          this.$Haxios(
            this.QueryUrl + '/vegetable/editvegetable',
            {
              xgrid,
              scxxid,
              scmc,
              sczl,
              zzjj,
              sczq,
              cnj,
              cnpf,
              scjj,
              tjzzmj,
              scslt,
              zpurls
            },
            this.path,
            this.getCookie('token')
          ).then(res => {
            _this.ImgFormDate = ''
            _this.MiniImgFormDate = ''
            // 判断用户是否提交成功
            if (res.data.code === 200) {
              console.log(res.data)
              _this.Editdialog = false
              _this.handleDataGet()
              _this.msgalert(res)
              _this.$refs.upload.clearFiles()
              _this.$refs.miniupload.clearFiles()
            } else {
              _this.msgalert(res)
            }
          })
        } else {
          // 校验失败
          this.$message.error('提交失败请检查表单')
          // console.log('error submit!!')
          return false
        }
      })
    },
    // 添加dialog提交
    Addformupdate (Addform) {
      // 校验通过
      let _this = this
      this.$refs[Addform].validate(valid => {
        if (valid) {
          console.log('Addform成功')

          // 拼接字符串
          let zzjj = `${this.Addform.startzzjj}-${this.Addform.endzzjj}`
          let sczq = `${this.Addform.startsczq}-${this.Addform.endsczq}`

          let xgrid = this.xgrid
          let scmc = this.Addform.scmc
          let sczl = this.Addform.sczl
          let cnpf = this.Addform.cnpf
          let cnj = this.Addform.cnj
          let tjzzmj = this.Addform.tjzzmj
          let scjj = this.Addform.scjj
          let zpurls = this.Addform.filelist
          let scslt = this.Addform.Miniscslt
          this.$Haxios(
            this.QueryUrl + '/vegetable/addvegetable',
            {
              xgrid,
              scmc,
              sczl,
              zzjj,
              sczq,
              cnj,
              cnpf,
              scjj,
              tjzzmj,
              scslt,
              zpurls
            },
            this.path,
            this.getCookie('token')
          ).then(res => {
            // 判断用户是否提交成功
            if (res.data.code === 200) {
              console.log(res.data)
              _this.Adddialog = false
              _this.handleDataGet()
              _this.msgalert(res)
              _this.$refs.upload.clearFiles()
              _this.$refs.miniupload.clearFiles()
            } else {
              _this.msgalert(res)
            }
            // _this.ImgFormDate = ''
            // console.log(res.data)
            // _this.Adddialog = false
            // _this.handleDataGet()
            // _this.msgalert(res)
            // _this.$refs.upload.clearFiles()
          })
        } else {
          // 校验失败
          this.$message.error('提交失败请检查表单')

          return false
        }
      })
    },

    // 测试方法
    test () {
      console.log(this.Addform.cookinput0)
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
}

.searchitem {
  float: right;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.checkAll {
  width: 100%;
}
.box-cardl {
  width: 400px;
  float: left;
}
.box-cardr {
  width: 400px;
  float: right;
}

.inputclass {
  width: 200px;
}
.appendinput {
  width: 150px;
}
.submitbtn {
  margin-top: 10px;
}
.cookbox {
  margin: 50px auto;
  height: 50px;
  width: 100px;
  float: left;
}
.cooktitle {
  vertical-align: middle;
  // margin: 50px auto;

  text-align: center;
}
.cookimg {
  float: right;
}
.cookname {
  width: 150px;
  margin: 10px auto;
}
</style>
