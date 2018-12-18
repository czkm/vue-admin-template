
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
