<template>
  <div class="login-page-container">
    <el-form
      :model="LoginForm"
      :rules="loginrule"
      ref="LoginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="sjhm">
        <el-input type="text" v-model="LoginForm.sjhm" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="LoginForm.pwd"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleLogin" :loading="logining">登录</el-button>
           <!-- <el-button type="primary" style="width:100%;" @click="test()" >test</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      QueryUrl: this.$store.state.BaseUrl,
      logining: false,
      LoginForm: {
        sjhm: 'admin',
        pwd: '123456'
      },
      loginrule: {
        sjhm: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }

        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      checked: true,
      rootArry: [] // c菜单

    }
  },
  methods: {
    test () {
      let _this = this
      // let data = this.$JSEncrypt('123456')
      // console.log(data)
      _this.$router.push({ path: '/main' })
    },
    handleLogin (ev) {
      let _this = this
      _this.$refs.LoginForm.validate(valid => {
        // 判断是否有值
        if (valid) {
          _this.logining = true
          // var loginParams = {
          //   sjhm: this.LoginForm.sjhm,
          //   pwd: this.LoginForm.pwd
          // }
          let sjhm = this.LoginForm.sjhm
          let pwd = this.$JSEncrypt(this.LoginForm.pwd)

          this.$axios
            .post(this.QueryUrl + '/admin/login', {
              sjhm,
              pwd
            })
            .then(res => {
              console.log(res)
              _this.msgalert(res)
              // 判断是否通过校验
              if (res.data.result) {
                _this.setCookie('sjhm', res.data.result.sjhm, '9999') // 用户名
                _this.setCookie('nc', res.data.result.nc, '9999') // 用户昵称
                _this.setCookie('rylx', res.data.result.rylx, '9999') // 人员类型
                _this.setCookie('token', res.data.result.token, '9999') // 用户token
                _this.setCookie('userid', res.data.result.userid, '9999') // 用户userid
                _this.logining = false
                // sessionStorage.setItem('user', JSON.stringify(loginParams))
                // console.log(111)

                // 填充菜单

                console.log(res.data.result.sysfunctionEntityList)
                let menulist = res.data.result.sysfunctionEntityList
                // let rootArry = []
                for (let Rootindex = 0; Rootindex < menulist.length; Rootindex++) {
                  // 获取根节点
                  if (menulist[Rootindex].parent === 'root') {
                    _this.rootArry.push(menulist[Rootindex])
                    console.log(menulist[Rootindex])
                  }
                }
                for (var index = 0; index < _this.rootArry.length; index++) {
                  _this.rootArry[index] = _this.getmenu(menulist, _this.rootArry[index])
                }
                _this.$store.state.rootArry = _this.rootArry
                _this.$router.push({ path: '/main' })
              } else {
                _this.logining = false
              }
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getmenu (datas, rootArry) {
      var json = this.childerLength(datas, rootArry.functionid)
      rootArry.children = []
      if (json.length > 0) {
        console.log(json.length)
        //
        // 添加children属性
        rootArry.children = json
        this.getmenu(datas, json)
      } else {
        console.log('返回' + rootArry.title)
      }

      return rootArry
    },
    // 获取子节点
    childerLength (datas, parentid) {
      var jsonarray = []
      for (let index = 0; index < datas.length; index++) {
        if (datas[index].parent === parentid) {
          jsonarray.push(datas[index])
        }
      }
      return jsonarray
    }

  }
}
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

label.el-checkbox.remember {
  margin: 0px 0px 35px 0px;
}
</style>
