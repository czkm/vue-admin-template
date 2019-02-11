// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import store from './store/index'
import echarts from 'echarts'
// 引入加密文件
import { JSEncrypt } from 'jsencrypt'// 自用工具类
import tool from './api/tool'
import Haxios from './api/ajax.js'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
// 头部带参数axios
Vue.prototype.$Haxios = Haxios

Vue.prototype.$JSEncrypt = JSEncrypt

Vue.prototype.$JSEncrypt = function (password) {
  let encrypt = new JSEncrypt()
  //  设置公钥
  encrypt.setPublicKey(this.$store.state.publickey)
  let data = encrypt.encrypt(password)
  return data
}

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(tool)

// 将所有未登录会话重定向到 /login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // if (this.$store.state.rootArry) {
    //   console.log('在路由里判断无值')
    // }
    // this.delCookie(this.getCookie('token'))
  }
  // var user = sessionStorage.getItem('user')
  // var token = this.getCookie('token')
  // if (!token) {
  //   next({
  //     path: '/login'
  //   })
  // }

  if (to.path === '/DistributionCenter') {
    next({
      path: '*'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
