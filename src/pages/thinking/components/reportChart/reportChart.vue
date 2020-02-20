<template>
<div>
  <ul class="documentType">
    <li>
      <p>政府工作报告</p>
      <p>{{chartData.countsData[0].case}}</p>
    </li>
    <li>
      <p>党代会报告</p>
      <p>{{chartData.countsData[1].case}}</p>
    </li>
    <li>
      <p>全会报告</p>
      <p>{{chartData.countsData[2].case}}</p>
    </li>
    <li>
      <p>中期评估</p>
      <p>{{chartData.countsData[3].case}}</p>
    </li>
  </ul>
  <div id="reportChart"></div>
</div>
</template>
<script>
export default {
  name: 'reportChart',
  data() {
    return {}
  },
  props: {
    chooseDocumetVisible: {
      type: Boolean,
      default: false
    },
    chartData: {
      type: Object,
      default: {}
    },
  },
  mounted(){
    this.reportChart(this.chartData.chartData)
  },
  methods: {
    reportChart(data) {
      let legends = []
      for (let item of data.values()) {
        legends.push(item.name)
      }
      let myChart = this.$echarts.init(document.getElementById('reportChart'))
      let option = {
        color: ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top:'10%',
          left: 'right',
          textStyle:{
            color:'#fff'
          },
          data: legends
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['45%', '70%'],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './reportChart.scss';
</style>