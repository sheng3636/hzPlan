<template>
  <div>
    <el-dialog title="我的收藏" :visible.sync="myEcollectVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      :show-close="false" custom-class="myEcollectDialog" width="60%">
      <div class="inner scroll">
        <div class="ecollectItem">
          <h3 class="ecollectClass">历史借鉴</h3>
          <div class="ecolllectList" v-for="(item1,index1) in myEcollectList.historical_lessons" :key="index1">
            <h2 class="title">《{{item1.SOURCES}}》</h2>
            <div class="content" v-for="(item2,index2) in item1.LIST" :key="index2">
              <p class="list">
                <span>【{{item2.TITLE}}】</span>
                <span>{{item2.CONTENT}}</span>
              </p>
              <p class="EcollectTool">
                <i class="el-icon-document" @click="handleCopy(item2.CONTENT,$event)"></i>
                <i class="el-icon-edit" @click="editCollect(item2.TITLE,item2.CONTENT,item2.SOURCES,item2.COLLECT_NO)"></i>
                <i class="el-icon-delete" @click="delEcollectFn(item2.COLLECT_NO)"></i>
              </p>
            </div>
          </div>
        </div>
        <div class="ecollectItem">
          <h3 class="ecollectClass">上位指导</h3>
          <div class="ecolllectList">
            <h2 class="title">《浙江省“十四五”国民经济和社会发展规划纲要》</h2>
            <p class="content">【举起旗帜】以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，</p>
            <p class="content">【拟定战略】以“八八战略”为总纲，</p>
            <p class="content">【明确要求】以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力提升为基本立足点，以深化改革扩大开放为根本动力，</p>
            <p class="content">【提出任务】进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，</p>
            <p class="content">【描绘目标】为高水平建设社会主义现代化开好局、起好步</p>
          </div>
        </div>
        <div class="ecollectItem">
          <h3 class="ecollectClass">报告参考</h3>
          <div class="ecolllectList">
            <h2 class="title">《台州市政府工作报告（2019年）》</h2>
            <word-cloud :data="wordCloudData"></word-cloud>
            <p class="content">
              要高举习近平新时代中国特色社会主义思想伟大旗帜，全面贯彻党的十九大和十九届二中、三中全会精神，以“八八战略”再深化、改革开放再出发为主题，以高质量发展为主线，以现代化湾区建设统领“再创民营经济新辉煌”和“新时代美丽台州建设”，突出稳企业、增动能、保平安，统筹推进稳增长、促改革、调结构、惠民生、防风险工作，早日跻身全省经济综合实力第二方阵前列，以优异成绩庆祝新中国成立70周年。
            </p>
            <p class="content">对比分析：《台州市政府工作报告（2019年）》VS《台州市政府工作报告（2018年）》</p>
            <div id="hotWord"></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="myEcollectHide">取消</el-button>
        <el-button type="primary" @click="myEcollectHide">生成文档</el-button>
      </span>
    </el-dialog>
    <!-- 添加摘要 -->
    <summary-info @closeSummaryInfo="closeSummaryInfo" @submitSummaryInfo="submitSummaryInfo"
      :summary-visible="summaryVisible" :summary-val="collectParams"></summary-info>
  </div>
</template>
<script>
import {
  delEcollect
} from '@/api/thinkingApi'
import summaryInfo from '../summaryInfo/summaryInfo'
import wordCloud from '@/components/wordCloud/wordCloud'
import clip from '@/utils/clipboard'
import {menuMixin} from '@/utils/mixin.js'
export default {
  name: 'myEcllect',
  components: { summaryInfo, wordCloud },
  mixins: [menuMixin],
  props: {
    myEcollectVisible: {
      type: Boolean,
      default: false
    },
    myEcollectList: {
      type: Object,
      default: {}
    },
    wordCloudData: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.hotWord()
    })    
  },
  methods: {
    // 复制收藏项
    handleCopy(text, event) {
      clip(text, event)
    },
    // 删除收藏项
    delEcollectFn (id){
      this.$confirm('是否删除该收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEcollect({collect_no:id}).then( res => {
          this.$message({
            message: res.message,
            type: res.code === '0' ? 'success' : 'error'
          })
          this.$parent.getEcollectFn()       
        })
      })
    },
    // 关闭我的收藏弹窗
    myEcollectHide() {
      this.$emit('closeMyEcollect')
    },
    // 热词echarts
    hotWord() {
      let charts = this.$echarts.init(document.getElementById('hotWord'))
      let option = {
        color: ['#3398DB'],
        title: {
          top: '3%',
          x: 'center',
          text: '公共热词',
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
          top: '13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '改革开放',
              '人民',
              '和谐',
              '大力',
              '节能减排',
              '社会',
              '提高',
              '全国',
              '治理',
              '致力',
              '深入践行',
              '实体经济',
              '综合治理',
              '认真',
              '现代化'
            ],
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
            name: '公共热词',
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
            data: [
              65,
              63,
              60,
              58,
              55,
              52,
              51,
              48,
              42,
              37,
              30,
              31,
              31,
              24,
              20,
              15
            ]
          }
        ]
      }

      charts.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './myEcollect.scss';
</style>