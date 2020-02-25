<template>
  <div>
    <el-dialog title="我的收藏" :visible.sync="myEcollectVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false" custom-class="myEcollectDialog" width="60%">
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
          <div class="ecolllectList" v-for="(item1,index1) in myEcollectList.upper_guide" :key="index1">
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

      <!-- <div class="inner scroll">
        <div class="ecollectItem">
          <h3 class="ecollectClass">历史借鉴</h3>
          <div class="ecolllectList">
            <h2 class="title">台州市“十三五”国民经济和社会发展规划纲要》</h2>
            <div class="content">
              <p class="list">
                <span>【拟定战略】</span>
                <span>以“四个全面”战略布局为统领，以
                  创新、协调、绿色、开放、共享五大发展理念为引领；</span>
              </p>
              <p class="list">
                <span>【明确要求】</span>
                <span>以“更进一步、更快一步，继续发挥先行和示范作用”为总要求；</span>
              </p>
              <p class="list">
                <span>【设计路径】</span>
                <span>着力推动“三区”融合、“三市”同城、“三湾”联动、“三带”协同，</span>
              </p>
              <p class="list">
                <span>【提出任务】</span>
                <span>【坚持发展是第一要务，提高发展质量和效益，加快形成引领经济发展新常态的体制机制和发展方式，统筹推进经济、政治、文化、社会、生态文明建设和党的建设，</span>
              </p>
              <p class="list">
                <span>【描绘目标】</span>
                <span>确保实现“四翻番”，高水平全面建成小康社会。</span>
              </p>
            </div>
          </div>
        </div>
        <div class="ecollectItem">
          <h3 class="ecollectClass">上位指导</h3>

          <div class="ecolllectList">
            <h2 class="title">《浙江省“十四五”规划基本思路》</h2>
            <div class="content">
              <p class="list">
                <span>【举起旗帜】</span>
                <span>以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，</span>
              </p>
              <p class="list">
                <span>【拟定战略】</span>
                <span>以“八八战略”为总纲，</span>
              </p>
              <p class="list">
                <span>【明确要求】</span>
                <span>以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力提升为基本立足点，以深化改革扩大开放为根本动力，</span>
              </p>
              <p class="list">
                <span>【提出任务】</span>
                <span>进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，</span>
              </p>
              <p class="list">
                <span>【描绘目标】</span>
                <span>为高水平建设社会主义现代化开好局、起好步。</span>
              </p>
            </div>
          </div>
        </div>
        <div class="ecollectItem">
          <h3 class="ecollectClass">报告参考</h3>
          <div class="ecolllectList">
            <h2 class="title">《五届四次党代会报告》</h2>
            <p class="content">
              要高举习近平新时代中国特色社会主义思想伟大旗帜，全面贯彻党的十九大和十九届二中、三中全会精神，以“八八战略”再深化、改革开放再出发为主题，以高质量发展为主线，以现代化湾区建设统领“再创民营经济新辉煌”和“新时代美丽台州建设”，突出稳企业、增动能、保平安，统筹推进稳增长、促改革、调结构、惠民生、防风险工作，早日跻身全省经济综合实力第二方阵前列，以优异成绩庆祝新中国成立70周年。
            </p>
            <div id="hotWord"></div>
          </div>
        </div>
      </div> -->
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
import { delEcollect } from '@/api/thinkingApi'
import summaryInfo from '../summaryInfo/summaryInfo'
import wordCloud from '@/components/wordCloud/wordCloud'
import clip from '@/utils/clipboard'
import { menuMixin } from '@/utils/mixin.js'
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
    delEcollectFn(id) {
      this.$confirm('是否删除该收藏?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEcollect({ collect_no: id }).then(res => {
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
          top: '13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '发展',
              '建设',
              '经济',
              '民营',
              '推进',
              '高质量',
              '时代',
              '工作',
              '深化',
              '全面',
              '推动',
              '治理',
              '坚持',
              '产业',
              '加快'
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
            data: [91, 85, 85, 53, 52, 41, 38, 36, 36, 34, 32, 31, 31, 30, 30]
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