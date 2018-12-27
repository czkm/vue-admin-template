<template>
  <!-- <div class="basetable" v-loading="loading" element-loading-text="拼命加载中"> -->
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">
      <!-- <el-input v-model="search" clearable style="width: 200px" placeholder="请输入内容"/>
      <el-button type="primary" @click="handleSearch()">搜索</el-button> -->
      <el-button type="success" @click="add()">添加管理</el-button>
    </div>
    <!-- 主界面 -->
    <div class="tableMain">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-tag size="medium" v-html="(scope.row.name)"/>
        </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机" ></el-table-column>
        <el-table-column prop="group" label="所属分组" >

        </el-table-column>
        <el-table-column prop="status" label="状态" >
            <template slot-scope="scope">
         <el-tag smize="mediu" v-if="scope.row.status == true" >启用</el-tag>
         <el-tag smize="mediu" type="danger" v-else>禁用</el-tag>
         </template>
        </el-table-column>
        <el-table-column prop="comment" label="备注" ></el-table-column>
        <!-- <el-table-column prop="landtype" label="土地状态" ></el-table-column>
        <el-table-column prop="creatdate" label="创建时间" ></el-table-column>
        <el-table-column prop="changedate" label="修改时间" ></el-table-column>
        <el-table-column prop="changeid" label="修改人ID" ></el-table-column> -->

        <el-table-column label="操作">
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
    <el-dialog title="管理人员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input class="newinput" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="所属分组" :label-width="formLabelWidth">
                <template>
            <el-select v-model="form.group" placeholder="请选择">
                <el-option
                v-for="item in groups"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </template>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-switch
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="启用"
                  inactive-text="禁用"
                  v-model="form.status"
                  @change=change()>
                  </el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input type="textarea" class="newinput" v-model="form.comment"></el-input>
        </el-form-item>
        <el-form-item label="权限设置" :label-width="formLabelWidth">
          <el-card class="box-cardl">
        <el-checkbox class="checkAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
               <el-tag >用户管理</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看用户管理列表"></el-checkbox>
            </el-checkbox-group>
              <el-tag >订单中心</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看用户订单详情"></el-checkbox>
            </el-checkbox-group>
            <el-tag >消息中心</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看消息历史列表"></el-checkbox>
                <el-checkbox  label="发布公告"></el-checkbox>
            </el-checkbox-group>
             <el-tag >土地中心</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看土地详情"></el-checkbox>
            </el-checkbox-group>
          </el-card>
          <el-card class="box-cardr">
             <el-tag >种植中心</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看用户信息列表"></el-checkbox>
                <el-checkbox  label="执行操作按钮"></el-checkbox>
            </el-checkbox-group>
             <el-tag >配送中心</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看配送用户信息列表"></el-checkbox>
                <el-checkbox  label="执行配送操作按钮"></el-checkbox>
            </el-checkbox-group>
             <el-tag >财务管理</el-tag>
             <el-checkbox-group v-model="form.RootList">
                <el-checkbox  label="查看财务进账明细"></el-checkbox>
            </el-checkbox-group>
          </el-card>
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
const RootlistOptions = [
  '查看用户管理列表', '查看用户订单详情', '查看消息历史列表', '发布公告',
  '查看土地详情', '查看用户信息列表', '执行操作按钮', '查看配送用户信息列表',
  '执行配送操作按钮', '查看财务进账明细']
export default {
  data () {
    return {
      isIndeterminate: true,
      checkAll: false,
      RootList: RootlistOptions,
      groups: [{
        value: '农场管理',
        label: '农场管理'
      }, {
        value: '超级农场管理',
        label: '超级农场管理'
      }],
      group: '',
      status: false,

      baseUrl: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example',
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      loading: true,
      // tableData: '',
      tableData: [
        {
          name: '小王',
          phone: '12345678',
          group: '农场管理',
          status: true,
          comment: '农场管理',
          password: '32132'
        //   groups: [{
        //     value: '农场管理',
        //     label: '农场管理'
        //   },
        //   {
        //     value: '超级农场管理',
        //     label: '超级农场管理'
        //   }],
        //   value: '农场管理'
        }, {
          name: '小华',
          phone: '12345678',
          group: '农场管理',
          status: false,
          comment: '农场管理',
          password: ''
        //   groups: [{
        //     value: '农场管理',
        //     label: '农场管理'
        //   },
        //   {
        //     value: '超级农场管理',
        //     label: '超级农场管理'
        //   }],
        //   value: '农场管理'
        }, {
          name: '小林',
          phone: '12345678',
          group: '超级农场管理',
          status: true,
          comment: '超级管理',
          password: 'admin'
        //   groups: [{
        //     value: '农场管理',
        //     label: '农场管理'
        //   },
        //   {
        //     value: '超级农场管理',
        //     label: '超级农场管理'
        //   }],
        //   value: '超级农场管理'
        }
      ],

      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      // value6: '',
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
        phone: '',
        password: '',
        group: '',
        status: false,
        comment: '',
        RootList: []
      }
      this.dialogFormVisible = true
    },
    update () {
      // 格式化时间
      //   this.form.changedate = reformat(this.form.changedate)
      //   this.form.creatdate = reformat(this.form.creatdate)
    //   console.log(this.group)
    //   this.form.group = this.group
    //   console.log(this.form.group)
      //   console.log('this' + this.status)
      //   console.log('from' + this.form.status)
    //   console.log(this.checkList)
      console.log(this.form.RootList)
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
      this.$confirm(`将管理人员${deletename}删除，将同时删除此人的管理权限`, '删除管理人员', {
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
    handleCheckAllChange (val) {
      this.form.RootList = val ? RootlistOptions : []
      this.isIndeterminate = false
    }
    // handleRootListChange (value) {
    //   let checkedCount = value.length
    //   this.checkAll = checkedCount === this.Rootlist.length
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.Rootlist.length
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
