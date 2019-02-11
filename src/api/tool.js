
exports.install = function (Vue, options) {
  // 封装用户弹窗
  Vue.prototype.msgalert = function (res) {
    console.log(res)
    if (res.data.code === 200) {
      this.$message({
        message: res.data.msg,
        type: 'success'
      })

      // 登录超时
    } else if (res.data.code === 304) {
      this.$message({
        message: res.data.msg,
        type: 'error'
      })
      // 超时跳转login页
      this.$router.push({ path: '/login' })
    } else {
      // 提示用户
      console.log(res.data.msg)
      this.$message.error(res.data.msg)
    }
  }

  Vue.prototype.test = function () {
    console.log('我是二重调用方法')
  }
  // 页面分段请求  页面 限制 路径 路由路径 token
  Vue.prototype.PageAxios = function (page, limit, url, path, token, searchData = {}) {
    // console.log(Object.keys(searchData))

    for (const key in searchData) {
      if (searchData.hasOwnProperty(key)) {
        var ele = searchData[key]
        console.log(ele)
      }
    }
    // if (searchData == null) {
    //   searchData = {}
    // }
    searchData.page = page
    searchData.limit = limit
    this.loading = true
    let _this = this
    this.$axios
      .post(url, searchData,
        {
          headers: {
            'Content-Type': 'application/json',
            RequestPath: path,
            'TokenSession': token

          }
        }
      )
      .then(res => {
        console.log(res.data)
        console.log(res.data.rows)
        console.log('刷新页面')
        let total = res.data.total // 返回页面总数
        let limit = res.data.limit // 返回页数限制
        // let page = res.data.page // 返回第几页
        _this.tableData = res.data.rows
        // _this.currentPage = page // 初始页
        _this.total = total // 获取页面总数
        _this.pagesize = limit // 初始页
        // 停止加载动画
        _this.loading = false
        _this.msgalert(res)
      })
      // .catch(e => {
      //   console.log(e)
      // })
    console.log('我是内部方法')
  }

  // 设置cookie
  // setCookie('wxuserid', response.data.result.wxuserid, '9999') // 微信id
  Vue.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toGMTString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  }
  // 获取cookie
  Vue.prototype.getCookie = function (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  }
  // 清除cookie
  Vue.prototype.delCookie = function (Cookiename) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = Cookiename
    if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
  }
}
