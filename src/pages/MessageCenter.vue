<!--  -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="messagecenter">
          <el-form :label-position="labelPosition" label-width="200px" :model="publicform">
            <el-form-item label="发布公告"></el-form-item>
            <el-form-item label="标题">
              <el-input v-model="publicform.title"></el-input>
            </el-form-item>
            <el-form-item label="发布者">
              <el-input v-model="publicform.name"></el-input>
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

      <el-dialog title="发布详情" :visible.sync="dialogTableVisible">
        <el-table :data="messagepanel">
          <el-table-column property="startdate" label="日期" width="150"></el-table-column>
          <el-table-column property="title" label="标题" width="150"></el-table-column>
          <el-table-column property="name" label="发布者" width="150"></el-table-column>
          <el-table-column property="content" label="内容"></el-table-column>
        </el-table>
      </el-dialog>

      <el-col :span="12">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>发布记录</span>
            <el-button
              style="float: right; padding: 3px 0"
              @click="dialogTableVisible = true"
              type="text"
            >查看详情</el-button>
          </div>
          <div v-for="(item, index) in messagepanel" :key="index" class="text item">
            {{'发布信息：' + item.title}}
            <p></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Axios from '@/api/Axios'
// import axios from 'axios'
export default {
  data () {
    return {
      // time: new Date(),
      dialogTableVisible: false,
      labelPosition: 'right',
      messagepanel: '',
      publicform: {
        title: '',
        name: '',
        content: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('标题：' + this.publicform.title +
       '内容' + this.publicform.content)
    },
    httpGet () {
      this.$axios({
        url: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example/getmessagepanel',
        method: 'get'

      }).then(res => {
        this.messagepanel = res.data.messagepanel
      })
      // Axios.postTest('getplant').then(res => {
      //   this.tableData = res.data.tableData
      // // })
      // Axios.getTest('getmessagepanel').then(res => {
      //   // console.log(res)
      //   this.messagepanel = res.data.messagepanel
      // })
      // axios.get('https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example/getmessagepanel',
      //   {
      //     openid: 1
      //   }
      // ).then((res) => {
      //   this.messagepanel = res.data.messagepanel
      // })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.httpGet()
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
  width: 600px;
  float: right;
}
</style>
