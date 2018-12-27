
import Vue from 'vue'
import Vuex from 'vuex'

// // 引入四个基本模块
// import state from './state'
// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

// // 一定要声明使用插件
Vue.use(Vuex)

// // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
//   getters
// })

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    bseurl: 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example',
    options: [],
    activeIndex: '/mian',
    userInfo: {}
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
