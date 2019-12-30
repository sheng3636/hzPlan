<template>
  <div :id="wordCloudChart" :class="className" :style="{ height:height,width:width }" />
</template>
<script>
import 'echarts-wordcloud/dist/echarts-wordcloud'
export default {
  name: 'wordCloud',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '220px'
    },
    data: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      wordCloudChart: `chart-${~~(Math.random() * 100000)}`,
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(
        document.getElementById(this.wordCloudChart)
      )
      let option = {
        title: {
          text: this.title,
          x: 'center'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
          {
            type: 'wordCloud',
            gridSize: 10, // 用来调整词之间的距离
            sizeRange: [14, 25], // 用来调整字的大小范围
            rotationRange: [0, 30],
            textStyle: {
              // 随机生成字体颜色
              normal: {
                color: function() {
                  return `rgb(${Math.round(Math.random() * 255)},${Math.round(
                    Math.random() * 255
                  )},${Math.round(Math.random() * 255)}`
                }
              }
            },
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            data: this.data
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>