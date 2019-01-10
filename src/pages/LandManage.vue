<template>
  <div class="box">

 <el-input v-model="search"
    clearable
    style="width: 200px"
    placeholder="请输入内容"/>
 <el-button type="primary"
        @click="handleSearch()">搜索</el-button>
         <el-button class="btn-add" type="success"
        @click="handleAdd()">新增</el-button>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="landid"
      label="土地ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="农场名称">
    </el-table-column>
    <el-table-column
      prop="acreage"
      sortable
      label="总面积">
    </el-table-column>
    <el-table-column
      prop="usablearea"
      sortable
      label="可用面积">
    </el-table-column>
    <el-table-column
      prop="rentalarea"
      sortable
      label="起租面积">
    </el-table-column>
    <el-table-column
      prop="rentalprice"
      sortable
      label="起租单价">
    </el-table-column>
    <el-table-column
      prop="startdate"
      sortable
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="changedate"
      sortable
      label="修改时间">
    </el-table-column>
    <el-table-column
      prop="changeid"
      sortable
      label="修改人ID">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      search: '',
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        price: 0,
        desc: '',
        reserve: ''
      },
      tableData: [
        {
          startdate: '2016-05-02',
          changedate: '2017-05-02',
          name: '浪岐',
          landid: '01',
          acreage: '2100㎡',
          usablearea: '2100㎡',
          rentalarea: '10㎡',
          rentalprice: '3600元',
          changeid: '001'
        },
        {
          startdate: '2016-05-04',
          changedate: '2017-05-04',
          name: '某某',
          landid: '02',
          acreage: '1200㎡',
          usablearea: '1200㎡',
          rentalarea: '10㎡',
          rentalprice: '3600元',
          changeid: '001'
        }
      ]
    }
  },
  methods: {
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSearch () {
      console.log(this.search
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.count{
  text-align: right
}
</style>
