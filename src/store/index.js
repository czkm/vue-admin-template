
import Vue from 'vue'
import Vuex from 'vuex'

// // 引入四个基本模块
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

// // 一定要声明使用插件
Vue.use(Vuex)

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    bseurl: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example',
    BaseUrl: 'http://wysn.fancybull.cn/farmbackstage', // 'http://172.16.0.67:8088/farmbackstage', ,
    xgrid: 0, // 修改人id
    publickey: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzu6QebxqBf+OzDj9pQ9L
    7zi4+1NdXhvMcIJFlz1yjREVQtbGfblnY0VDM3vePdLS3rwSK/QCQTS6ZtMqGSa+
    mbwl16mUV+0HaUXWVVBbarx8qO5EMgR4H9E/LCWJYxfGeaz8AD/KYgKzOPH+Yopj
    O+VPWz93t94qT2JPxnMHiJCuO0XcBXNJ6O6HY7QWEzWYaC1OkmJyjOjwJ+S5datu
    1ZArXoTq/R07IZjpk5IaYyLyZ9dRsAfJrNzQD27PWhzNZJ0mpFNv0bkxkSEXLbke
    9PmTmtznsSpi8OJWnoV9pc4sVcsuXmHjaI1FIGGjOUnyV9X9agmWSm1ZfkOHUnmF
    6QIDAQAB`, // 设置公钥

    rootArry: [], // 全局菜单
    options: [],
    activeIndex: '/mian'
    // userInfo: {}
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      this.state.options.push(data)
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0
      for (let option of state.options) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.state.options.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index
    },
    // 设置详情信息
    save_detail_info (state, info) {
      this.state.userInfo = info
    }
  }
})

export default store
