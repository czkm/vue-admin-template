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

// axios.defaults.headers.post['Content-Type'] = 'Access-Control-Allow-Origin'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(router)
Vue.use(ElementUI)

// 将所有未登录会话重定向到 /login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  var user = sessionStorage.getItem('user')
  if (!user && to.path !== '/login') {
    next({
      path: '/login'
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
