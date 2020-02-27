<template>
  <el-dialog :title="docuTitle" :visible.sync="singleDocumentVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :show-close="false" custom-class="singleDocumetDialog" width="65%">
    <div class="inner singleDocumentWrap">
      <div class="header">
        <div class="tabRow">
          <el-button v-if="whichAnalyze" @click="analyzeType(0)">双文档对比分析</el-button>
          <p v-if="!whichAnalyze" @click="analyzeType(1)">
            <el-select v-model="docuValue" placeholder="请选择" @change="selectChange">
              <el-option v-for="(item,index) in docuOpts" :key="index" :label="item.docuname" :value="item.folderno">
              </el-option>
            </el-select>
            <el-button type="success" plain>单文档分析</el-button>
          </p>
        </div>
        <div class="tabRow">
          <!-- <span class="articleType">全文</span> -->
          <span class="articleType active">全文</span>
        </div>
      </div>
      <div class="article">
        <div class="leftArticle scroll" :class="{halfWidth:!whichAnalyze}"
          v-html="governmentWorkReportsFullTxtObj.html"></div>
        <div class="rightArticle scroll" v-if="!whichAnalyze" v-html="governmentWorkReportsFullTxtObj1.html"></div>
      </div>
      <word-cloud :data="wordCloudData" v-if="whichAnalyze"></word-cloud>
      <div class="doubleChart" v-if="!whichAnalyze">
        <word-cloud :data="wordCloudData" :width="width"></word-cloud>
        <div id="hotWord"></div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="singleDocumentHide">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  getGovernmentWorkReportsFullTxtApi,
  getGovernmentWorkReportsoptsApi,
  gethotWordApi
} from '@/api/thinkingApi'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import wordCloud from '@/components/wordCloud/wordCloud'
export default {
  name: 'singleDocument',
  components: { wordCloud },
  data() {
    return {
      docuTitle: '',
      governmentWorkReportsFullTxtObj: {},
      governmentWorkReportsFullTxtObj1: {},
      whichAnalyze: true,
      docuValue: '',
      width: '40%',
      docuOpts: []
    }
  },
  props: {
    singleDocumentVisible: {
      type: Boolean,
      default: false
    },
    wordCloudData: {
      type: Array,
      default: []
    },
    folderNo: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getGovernmentWorkReportsFullTxtFn()
    this.getGovernmentWorkReportsoptsFn()
          
  },
  methods: {
    // 选择对比文档
    selectChange(e) {
      getGovernmentWorkReportsFullTxtApi({ folderno: this.docuValue }).then(
        res => {
          this.governmentWorkReportsFullTxtObj1 = res.data
          this.docuTitle =
            this.governmentWorkReportsFullTxtObj.docuname +
            'VS' +
            res.data.docuname
            this.$nextTick(() => {
              this.hotWord(this.wordCloudData)
            })
        }
      )
    },
    analyzeType(flag) {
      if (flag == 0) {
        this.whichAnalyze = false
      } else {
        this.whichAnalyze = true
        this.docuValue = ''
        this.docuTitle = this.governmentWorkReportsFullTxtObj.docuname
      }
    },
    // 关闭文件分析弹窗
    singleDocumentHide() {
      this.isArticle = true
      this.docuValue = ''
      this.docuTitle = this.governmentWorkReportsFullTxtObj.docuname
      this.whichAnalyze = true
      this.$emit('closeSingleDocument')
    },
    // 报告参考-打开文档对比弹窗
    chooseDocuClick() {
      this.getGovernmentWorkReportsFullTxtFn()
      this.singleDocumentVisible = true
      this.guidePlanVisible = false
    },
    // 报告参考-查询政府工作报告全文
    getGovernmentWorkReportsFullTxtFn() {
      getGovernmentWorkReportsFullTxtApi({ folderno: this.folderNo }).then(
        res => {
          this.governmentWorkReportsFullTxtObj = res.data
          this.docuTitle = res.data.docuname
          this.hotWordFn(res.data.wrodcontent)
        }
      )
    },
    // 报告参考-热词查询
    hotWordFn(textArr) {
      let compareArr = []
      compareArr.push(textArr)
      gethotWordApi({ text: compareArr, value: '20' }).then(res => {
        this.wordCloudData = res.data
      })
    },
    // 报告参考-查询政府工作报告下拉框
    getGovernmentWorkReportsoptsFn() {
      getGovernmentWorkReportsoptsApi({ PageSize: 10, Page: 1 }).then(res => {
        this.docuOpts = res.data
      })
    },
    // 热词echarts
    hotWord(data) {
      let legends = []
      let dataValue = []
      for (let item of data.values()) {
        legends.push(item.name)
        dataValue.push(item.value)
      }
      let charts = this.$echarts.init(document.getElementById('hotWord'))
      let option = {
        color: ['#3398DB'],
        title: {
          top: '3%',
          x: 'center',
          text: '热词',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '3%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: legends,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#fff' //左边线的颜色
              }
            },
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                //x轴的文字改为竖版显示
                var str = value.split('')
                return str.join('\n')
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#fff' //左边线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: '热词',
            type: 'bar',
            barWidth: '15px',
            barGap: '50%',
            itemStyle: {
              normal: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(66, 229, 223, 1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(8, 65, 81, 0.5)'
                  }
                ]),

                barBorderRadius: [30, 30, 0, 0]
              }
            },
            data: dataValue
          }
        ]
      }

      charts.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './docuAnalysis.scss';
</style>