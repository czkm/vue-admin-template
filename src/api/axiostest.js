import axios from 'axios'
axios.defaults.timeout = 5000// 设置超时时间，规定时间内没有响应则执行失败回调
function ajax (obj) {
  return new Promise((resolve, reject) => {
    axios(obj).then((res) => {
      // axios成功后根据api返回数据格式处理逻辑
      if (Number(res.data.code) === 200) {
        resolve(res.data)
      } else {

      }
    }).catch((e) => {
      if (e.response) {
        console.log(e.config.url)
        console.log('错误码:' + e.response.status)
      } else if (e.request) {
        if (e.request.readyState === 4 && e.request.status === 0) {
          // 我在这里重新请求
          console.log(e.config.url); console.log('请求超时')
        }
      } else { console.log('Error', e.message) }
    })
  })
} export default { install: (Vue, options) => { Vue.prototype.$ajax = ajax } }
