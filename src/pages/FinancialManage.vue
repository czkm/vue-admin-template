<!--  -->
<template>

<div class="finalcialmanager" v-loading="loading" element-loading-text="刷新界面">
  <el-row  :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <el-tag  >总收入</el-tag>
        <count-to :startVal='startVal' :endVal='total' :duration='3000' class="card-panel-num"/>
      </el-card>
  </el-col>
   <el-col :span="3" >
       <div class="block">
    <el-date-picker
      v-model="month"
      type="month"
     value-format="yyyy-MM-dd"
      placeholder="选择月">
    </el-date-picker>
  </div>
    </el-col>
  <el-col :span="3" >
  <el-button type="primary"
        @click="handlemounth()">查询月份</el-button>
  </el-col>

  </el-row>
  <el-row :gutter="20" class="financial_box">
  <el-col :span="4" >
    <el-card shadow="hover" :body-style="{ padding: '0px' } ">
      <el-row :gutter="20">
        <el-col :span="8"><img src="../assets/logo.png" class="image"></el-col>
        <el-col :span="12">
          <el-tag >今日收入</el-tag>
          <p>
           <count-to :startVal='startVal' :endVal='today' :duration='3000' class="card-panel-num"/>
           </p>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
  <el-col :span="4" >
   <el-card shadow="hover" :body-style="{ padding: '0px' } ">
      <el-row :gutter="20">
        <el-col :span="8"><img src="../assets/logo.png" class="image"></el-col>
        <el-col :span="12">
          <el-tag >累计收入</el-tag>
          <p>
            <count-to :startVal='startVal' :endVal='monthCount' :duration='3000' class="card-panel-num"/>
            </p>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</el-row>
  <el-row>
    <el-col class="financial_chart" :span="24" >
      <div id="chartmain" style="width:100%; height: 600px;"></div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'hello',
  data () {
    return {
      path: 'FinancialManage',
      QueryUrl: this.$store.state.BaseUrl + '/chart/financial',
      total: 0, // 总收入
      today: 0, // 今日收入
      monthCount: 0, // 当前月份累计收入
      month: '', // 所选月份
      startVal: 0, // 起始值
      loading: true,
      dataShadow: []

    }
  },
  components: {
    // lineChartData: lineChartData.newVisitis,
    CountTo
  },

  mounted () {
    this.$nextTick(() => {
      this.httpGet()
    })
  },
  methods: {
    // 月份选择
    handlemounth () {
      this.EchartGet()
    },
    // 绘制柱状图
    drawLine (text, dataAxis, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('chartmain'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: text // this.echartdata.text,
          // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        // tooltip: {},
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          name: '人民币/元',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: this.dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: data
          }
        ]

      })
    },
    httpGet () {
      this.EchartGet()
    },
    // 获取数据
    EchartGet () {
      let month = (this.month).substring(0, 7)
      console.log(month)
      let _this = this

      // this.$axios.post(this.QueryUrl, {month}
      this.$Haxios(this.QueryUrl, {month}, this.path, this.getCookie('token')
      ).then(res => {
        console.log(res)
        // 判断回调有没有值
        if (res.data.data.length === 0) {
          _this.drawLine('该月份暂无数据')
          _this.loading = false
        } else {
          console.log('else' + res)
          let text = res.data.text
          let ARR = res.data.data
          let dataAxis = []
          let price = []
          let total = res.data.total
          let today = res.data.today
          let monthCount = res.data.monthCount
          console.log('total' + total + 'today' + today + 'monthCount' + monthCount)
          _this.total = total
          _this.today = today

          // 判断月份
          if (monthCount) {
            _this.monthCount = monthCount
          } else {
            _this.monthCount = 0
          }

          for (let index = 0; index < ARR.length; index++) {
            dataAxis.push(res.data.data[index].date.substring(5, 10))// 去掉年份
            price.push(res.data.data[index].price)
          // console.log(res.data.data[index].date)
          // console.log(res.data.data[index].price)
          }

          _this.drawLine(text, dataAxis, price)
          _this.loading = false
        }
      })
        .catch(e => {
          console.log(e)
        })
    }
  }

}

</script>
<style scoped lang="scss">
.financial_box{
  margin-top: 50px
}
.financial_chart{
  margin-top: 25px
}
.card-panel-num {
        font-size: 20px;

}
.image{
  width: 60px;
  height: 60px;
}
</style>
