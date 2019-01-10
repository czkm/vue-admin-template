<!--  -->
<template>

<div class="finalcialmanager" v-loading="loading" element-loading-text="刷新界面">
  <el-row  :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <el-tag  >总收入</el-tag>
        <count-to :startVal='startVal' :endVal='sumadd' :duration='3000' class="card-panel-num"/>
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
          <h3>￥123132</h3>
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
           <h3>￥123132</h3>
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
      // 月份
      month: '',
      sumadd: 1,
      startVal: 0,
      loading: true,
      dataShadow: []
      // data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220],
      // yMax: 500,
      // dataAxis: ['1/01', '1/02', '1/05', '1/08', '1/10', '1/12', '1/14', '1/16', '1/18', '1/20', '1/22', '1/24', '1/26', '1/28', '1/30']
    }
  },
  components: {
    // lineChartData: lineChartData.newVisitis,
    CountTo
  },

  mounted () {
    this.httpGet()
  },
  methods: {
    // 月份选择
    handlemounth () {
      console.log(this.month)
    },
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
          name: '人民币',
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
      let _this = this
      this.$axios
        .get(this.$store.state.bseurl + '/echart')
        .then(function (res) {
          // _this.sumadd = res.data.data
          // console.log(_this.arradd)
          _this.drawLine(res.data.text, res.data.dataAxis, res.data.data)
          _this.loading = false
          _this.sum(res.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 计算收入
    sum (arr) {
      // eslint-disable-next-line no-eval
      // console.log(eval(arr.join('+')))

      // eslint-disable-next-line no-eval
      this.sumadd = eval(arr.join('+')) * 1
      console.log(typeof (this.sumadd))
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
