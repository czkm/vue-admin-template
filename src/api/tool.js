
export function handleDataGet () {
  let _this = this
  this.$axios.post('http://172.16.0.67:8088/farmbackstage/appuser/queryuser', {
    page: 1,
    limit: _this.pagesize

  }).then(res => {
    console.log(res.data)
    console.log(res.data.rows)
    let total = res.data.total// 返回页面总数
    let limit = res.data.limit// 返回页数限制
    let page = res.data.page// 返回第几页
    _this.tableData = res.data.rows
    _this.currentPage = page// 初始页
    _this.total = total // 获取页面总数
    _this.pagesize = limit// 初始页
  }).catch(function (e) {
    console.log(e)
  })
}
// export function fetchArticle (id) {
//   return request({
//     url: '/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv (pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }
