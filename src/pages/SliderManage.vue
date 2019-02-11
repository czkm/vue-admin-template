<template>
  <div class="box" v-loading="loading" element-loading-text="拼命加载中">
    <el-button type="success" @click="addbanner()">添加轮播</el-button>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column prop="xgr" label="修改人"></el-table-column>
      <!-- <el-table-column prop="yxbz" label="有效标志">

      </el-table-column>-->
      <el-table-column label="有效标志">
        <template slot-scope="scope">
          <i v-if="scope.row.yxbz == 1">有效</i>
          <i v-else>无效</i>
        </template>
      </el-table-column>
      <el-table-column prop="linkurl" label="链接URL"></el-table-column>
      <el-table-column prop="yxj" label="优先级"></el-table-column>
      <el-table-column prop="cjsj" label="创建时间"></el-table-column>
      <el-table-column prop="xgsj" label="修改时间"></el-table-column>
      <el-table-column label="轮播图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.bannerurl" alt style="width: 75px;height: 75px">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row,scope.row.bannerid,scope.row.xgrid)"
          >编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row,scope.row.bannerid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10,15]"
      :page-size="pagesize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 编辑 -->
    <el-dialog title="编辑轮播 " :visible.sync="dialogEditBanner">
      <el-form :model="Editform">
        <!-- { required: true, message: '年龄不能为空'}, -->
        <el-form-item
        :label-width="formLabelWidth"
          label="优先级"
          prop="yxj"

        >
          <el-input  v-model.number="Editform.yxj" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="Editform.linkurl"></el-input>
        </el-form-item>
         <el-form-item label="轮播图" :label-width="formLabelWidth">
            <img :src="Editform.bannerurl" alt style="width: 75px;height: 75px">
          <!-- <el-input class="newinput" v-model="Editform.bannerurl"></el-input> -->
        </el-form-item>
        <el-form-item label="更改轮播图" >
          <el-upload
            :before-upload="beforeAvatarUpload"
            ref="upload"
            class="avatar-uploader"
            :action="UploadUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          > <img v-if="Editform.bannerurl" :src="Editform.bannerurl"  class="avatar">
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="Editupdate">确 定</el-button>
      </div>
    </el-dialog>

<!-- 新增轮播 -->
     <el-dialog title="新增轮播 " :visible.sync="dialogAddBanner">
      <el-form :model="Addform">
        <!-- { required: true, message: '年龄不能为空'}, -->
        <el-form-item
        :label-width="formLabelWidth"
          label="优先级"
          prop="yxj"

        >
          <el-input  v-model.number="Addform.yxj" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="Addform.linkurl"></el-input>
        </el-form-item>
          <el-form-item label="轮播图" :label-width="formLabelWidth">
            <img :src="Addform.bannerurl" alt style="width: 75px;height: 75px">
          <!-- <el-input class="newinput" v-model="Editform.bannerurl"></el-input> -->
        </el-form-item>
        <el-form-item label="添加轮播图" >

          <el-upload
            :before-upload="beforeAddBannerUpload"
            ref="upload"
            class="avatar-uploader"
             :action="UploadUrl()"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
            <img v-if="Addform.bannerurl" :src="Addform.bannerurl"  class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updatebanner">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      // imageUrl: '',
      path: 'SliderManage',
      QueryUrl: this.$store.state.BaseUrl + '/banner/querybanner',
      total: 0,
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: [],
      Editform: {
        yxj: '',
        bannerid: '',
        xgrid: '0',
        bannerurl: ''

      },
      Addform: {

      },
      dialogEditBanner: false,
      dialogAddBanner: false,
      formLabelWidth: '80px',
      currentIndex: '',
      xgrid: '' // 修改人id

    }
  },
  methods: {
    UploadUrl () {
      return ''
    },
    // 控制编辑
    handleEdit (index, row, bannerid, xgrid) {
      console.log(bannerid, xgrid)
      this.Editform.bannerid = bannerid
      this.Editform.xgrid = xgrid
      this.Editform = this.tableData[index]
      this.currentIndex = index
      this.dialogEditBanner = true
    },
    // 编辑保存
    Editupdate () {
      this.dialogEditBanner = false
      let _this = this
      let bannerid = _this.Editform.bannerid
      let bannerurl = _this.Editform.bannerurl
      let yxj = _this.Editform.yxj
      let linkurl = _this.Editform.linkurl
      let xgrid = _this.Editform.xgrid
      console.log(bannerurl)
      this.$Haxios(this.$store.state.BaseUrl + '/banner/editbanner', {
        bannerid, // BannerID
        bannerurl, // BannerURL
        yxj, // 优先级
        linkurl, // 链接URL
        xgrid // 修改人ID
      }, this.path, this.getCookie('token'))
        .then(res => {
          console.log('编辑' + res)
          _this.Editform.bannerurl = ''
          _this.handleDataGet()
          _this.msgalert(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 修改轮播状态 可用不可用
    handleDelete (index, row, bannerid) {
      let _this = this
      this.$Haxios(this.$store.state.BaseUrl + '/banner/delbanner', {bannerid}, this.path, this.getCookie('token'))
        .then(res => {
          console.log(res.data)
          _this.handleDataGet()
          _this.msgalert(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
    cancel () {
      this.Editform.bannerurl = ''
      this.Addform.bannerurl = ''

      this.dialogEditBanner = false
      this.dialogAddBanner = false
    },
    // 图片控制
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 编辑图片上传
    beforeAvatarUpload (file) {
      // 判断大小
      var isLt2M = file.size
      if (isLt2M > 2 * 1024 * 1024) {
        this.$message.error('传的图片太大了 2M就很多了!')
        this.uploadloading = false
        return false
      } else {
        let _this = this
        let fd = new FormData()
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        fd.append('img', file) // 传文件
        this.$axios
          .post(this.$store.state.BaseUrl + '/upload/imgupload', fd, config)
          .then(res => {
            console.log(res.data.result.imgurl)
            _this.Editform.bannerurl = res.data.result.imgurl
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    // 初始化轮播图表单内容
    addbanner () {
      this.Addform = {
        bannerurl: '',
        yxj: '',
        linkurl: '',
        xgrid: 0
      }
      this.dialogAddBanner = true
    },
    // 新增轮播图图片 等待后台返回轮播图路径
    beforeAddBannerUpload (file) {
      var isLt2M = file.size
      if (isLt2M > 2 * 1024 * 1024) {
        this.$message.error('传的图片太大了 2M就很多了!')
        this.uploadloading = false
        return false
      } else {
        let _this = this
        let banner = new FormData()
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        banner.append('img', file) // 传文件
        this.$axios
          .post(this.$store.state.BaseUrl + '/upload/imgupload', banner, config)
          .then(res => {
            console.log(res.data.result.imgurl)
            _this.Addform.bannerurl = res.data.result.imgurl
            console.log(_this.Addform.bannerurl)
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    // 新增轮播保存
    updatebanner () {
      // console.log(this.form.RootList)
      // this.tableData.push(this.form)
      this.dialogAddBanner = false
      let _this = this
      let bannerid = _this.Addform.bannerid
      let bannerurl = _this.Addform.bannerurl
      let yxj = _this.Addform.yxj
      let linkurl = _this.Addform.linkurl
      let xgrid = _this.Addform.xgrid
      console.log(bannerurl)
      this.$Haxios(this.$store.state.BaseUrl + '/banner/addbanner', {
        bannerid, // BannerID
        bannerurl, // BannerURL
        yxj, // 优先级
        linkurl, // 链接URL
        xgrid // 修改人ID
      }, this.path, this.getCookie('token'))
        .then(res => {
          _this.Addform.bannerurl = ''
          console.log(res)
          console.log(res.data.code)
          _this.handleDataGet()
          _this.msgalert(res)
        })
    },

    // 页面加载获取初始值
    handleDataGet () {
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
