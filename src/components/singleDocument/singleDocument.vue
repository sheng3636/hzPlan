<template>
  <el-dialog
    title="浙江省十三五规划纲要"
    :visible.sync="singleDocumentVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="singleDocumetDialog"
    width="65%"
  >
    <div class="inner singleDocumentWrap">
      <div class="header">
        <div class="tabRow">
          <el-button v-if="whichAnalyze" @click="analyzeType(0)">双文档对比分析</el-button>
          <p v-if="!whichAnalyze" @click="analyzeType(1)">
            <el-select v-model="docuValue" placeholder="请选择" @change="selectChange">
              <el-option v-for="(item,index) in docuOpts" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="success" plain>单文档分析</el-button>
          </p>
        </div>
        <div class="tabRow">
          <!-- <span class="articleType">全文</span> -->
          <span class="articleType active">指导思想</span>
        </div>
      </div>
      <div class="article">
        <div class="leftArticle scroll" :class="{halfWidth:!whichAnalyze && docuValue === '3'}">
          指导思想：
          以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，紧紧围绕“五位一体”总体布局和“四个全面”战略布局，始终坚持以人民为中心的发展思想，
          全面落实新发展理念。充分发挥中国革命红船起航地、中国改革开放先行地、习近平新时代中国特色社会主义思想重要萌发地的优势，自觉践行习近平总书记赋予浙江的“
          干在实处，走在前列，勇立潮头”新期望，以“八八战略”为总纲，以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力
          提升为基本立足点，以深化改革扩大开放为根本动力，进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，
          为高水平建设社会主义现代化开好局、起好步。 以“八八战略”为总纲。“八八战略”是引领我省发展的总纲领，是推进我省各项工作的总方略，管方向、管长远、管全局。
          开启我省社会主义现代化建设新征程，必须始终坚持“八八战略”，坚持一张蓝图绘到底，久久为功，不负新使命，激发新作为，书写新篇章。
          以人的现代化为导向。在高水平全面建成小康社会的基础上，高水平建设现代化浙江是浙江发展的宏伟蓝图和奋斗目标。必须紧紧抓住以人为核心的现代化本质，
          促进人的全面发展，努力实现人民共同富裕，实现人民对美好生活的向往，
          以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，紧紧围绕“五位一体”总体布局和“四个全面”战略布局，始终坚持以人民为中心的发展思想，
          全面落实新发展理念。充分发挥中国革命红船起航地、中国改革开放先行地、习近平新时代中国特色社会主义思想重要萌发地的优势，自觉践行习近平总书记赋予浙江的“
          干在实处，走在前列，勇立潮头”新期望，以“八八战略”为总纲，以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力
          提升为基本立足点，以深化改革扩大开放为根本动力，进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，
          为高水平建设社会主义现代化开好局、起好步。 以“八八战略”为总纲。“八八战略”是引领我省发展的总纲领，是推进我省各项工作的总方略，管方向、管长远、管全局。
          开启我省社会主义现代化建设新征程，必须始终坚持“八八战略”，坚持一张蓝图绘到底，久久为功，不负新使命，激发新作为，书写新篇章。
          以人的现代化为导向。在高水平全面建成小康社会的基础上，高水平建设现代化浙江是浙江发展的宏伟蓝图和奋斗目标。必须紧紧抓住以人为核心的现代化本质，
          促进人的全面发展，努力实现人民共同富裕，实现人民对美好生活的向往，
          以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，紧紧围绕“五位一体”总体布局和“四个全面”战略布局，始终坚持以人民为中心的发展思想，
          全面落实新发展理念。充分发挥中国革命红船起航地、中国改革开放先行地、习近平新时代中国特色社会主义思想重要萌发地的优势，自觉践行习近平总书记赋予浙江的“
          干在实处，走在前列，勇立潮头”新期望，以“八八战略”为总纲，以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力
          提升为基本立足点，以深化改革扩大开放为根本动力，进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，
          为高水平建设社会主义现代化开好局、起好步。 以“八八战略”为总纲。“八八战略”是引领我省发展的总纲领，是推进我省各项工作的总方略，管方向、管长远、管全局。
          开启我省社会主义现代化建设新征程，必须始终坚持“八八战略”，坚持一张蓝图绘到底，久久为功，不负新使命，激发新作为，书写新篇章。
          以人的现代化为导向。在高水平全面建成小康社会的基础上，高水平建设现代化浙江是浙江发展的宏伟蓝图和奋斗目标。必须紧紧抓住以人为核心的现代化本质，
          促进人的全面发展，努力实现人民共同富裕，实现人民对美好生活的向往，
          以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，紧紧围绕“五位一体”总体布局和“四个全面”战略布局，始终坚持以人民为中心的发展思想，
          全面落实新发展理念。充分发挥中国革命红船起航地、中国改革开放先行地、习近平新时代中国特色社会主义思想重要萌发地的优势，自觉践行习近平总书记赋予浙江的“
          干在实处，走在前列，勇立潮头”新期望，以“八八战略”为总纲，以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力
          提升为基本立足点，以深化改革扩大开放为根本动力，进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，
          为高水平建设社会主义现代化开好局、起好步。 以“八八战略”为总纲。“八八战略”是引领我省发展的总纲领，是推进我省各项工作的总方略，管方向、管长远、管全局。
          开启我省社会主义现代化建设新征程，必须始终坚持“八八战略”，坚持一张蓝图绘到底，久久为功，不负新使命，激发新作为，书写新篇章。
          以人的现代化为导向。在高水平全面建成小康社会的基础上，高水平建设现代化浙江是浙江发展的宏伟蓝图和奋斗目标。必须紧紧抓住以人为核心的现代化本质，
          促进人的全面发展，努力实现人民共同富裕，实现人民对美好生活的向往，
        </div>
        <div class="rightArticle scroll" v-if="!whichAnalyze && docuValue === '3'">
          指导思想：
          以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的十九大精神，紧紧围绕“五位一体”总体布局和“四个全面”战略布局，始终坚持以人民为中心的发展思想，全面落实新发展理念。充分发挥中国革命红船起航地、中国改革开放先行地、习近平新时代中国特色社会主义思想重要萌发地的优势，自觉践行习近平总书记赋予浙江的“干在实处，走在前列，勇立潮头”新期望，以“八八战略”为总纲，以人的现代化为导向，以推动高质量发展为主题，以深化供给侧结构性改革为主线，以创新驱动和竞争力提升为基本立足点，以深化改革扩大开放为根本动力，进一步实施富民强省十大行动计划，促进区域协调发展，加强生态文明建设，确保社会和谐稳定，为高水平建设社会主义现代化开好局、起好步。
          以“八八战略”为总纲。“八八战略”是引领我省发展的总纲领，是推进我省各项工作的总方略，管方向、管长远、管全局。开启我省社会主义现代化建设新征程，必须始终坚持“八八战略”，坚持一张蓝图绘到底，久久为功，不负新使命，激发新作为，书写新篇章。 
          以人的现代化为导向。在高水平全面建成小康社会的基础上，高水平建设现代化浙江是浙江发展的宏伟蓝图和奋斗目标。必须紧紧抓住以人为核心的现代化本质，促进人的全面发展，努力实现人民共同富裕，实现人民对美好生活的向往，为全面建设社会主义现代化强国贡献浙江力量，提供浙江素材和浙江方案。
          以推动高质量发展为主题。高质量发展是现代化建设的本质要求，必须全面贯彻创新、协调、绿色、开放、共享的发展理念，强化实体经济的吸引力和竞争力，发挥制造业的关键引领作用，大力推动质量变革、效率变革、动力变革，实现经济社会各领域的高质量发展。
          以深化供给侧结构性改革为主线。推进供给侧结构性改革是提高发展质量的治本之策。在新时代，满足人民日益增长的美好生活需要、解决发展不平衡不充分问题、推动经济高质量发展，必须以巩固“三去一降一补”成果为立足点，以增强微观主体活力为突破点，以提升产业链水平为着力点，以畅通国民经济循环为落脚点，全面深化供给侧结构性改革。
          以创新驱动和竞争力提升为基本立足点。创新是转型升级的强大驱动力，竞争力提升是现代化建设的重要战略举措。必须大力推进以科技创新为核心、以产业创新为主战场的全面创新，对标国内国际先进水平，着力锻造内功，全方位提升区域、产业、企业、品牌竞争力，全方位推进高质量发展。
          以深化改革扩大开放为根本动力。改革开放是我国的基本国策，也是推动高质量发展的根本动力。深化市场化改革，就是以“最多跑一次”改革为总牵引，充分发挥市场配置资源的决定性作用，推动经济更有效率、更加公平、更可持续发展。扩大高水平开放，就是要全面接轨国际规则，更无缝融入国际经济，打造全方位开放新格局。
        </div>
      </div>
      <word-cloud :data="wordCloudData" v-if="whichAnalyze"></word-cloud>
      <div class="doubleChart" v-if="!whichAnalyze && docuValue === '3'">
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
import "echarts-wordcloud/dist/echarts-wordcloud"
import wordCloud from '@/components/wordCloud/wordCloud'
export default {
  name: 'singleDocument',
  components:{wordCloud},
  data() {
    return {
      whichAnalyze:true,
      docuValue:'',
      width:'40%',
      docuOpts:[
        {
          label:'十一五规划纲要',
          value:'0'
        },
        {
          label:'十二五规划纲要',
          value:'1'
        },
        {
          label:'十三五规划纲要',
          value:'2'
        },
        {
          label:'十四五规划纲要',
          value:'3'
        },
      ]
    }
  },
  props: {
    singleDocumentVisible: {
      type: Boolean,
      default: false
    },
    wordCloudData:{
      type: Array,
      default: []
    }
  },
  mounted() {
  },
  methods: {
    selectChange(e){
      if(e == 3) {
        this.$nextTick(() => {
          this.hotWord()
        })
      }
    },
    analyzeType(flag) {
      if (flag == 0) {
        this.whichAnalyze = false
        
      } else {
        this.whichAnalyze = true
        this.docuValue = ''
      }
    },
    // 关闭文件分析弹窗
    singleDocumentHide() {
      this.isArticle = true
        this.docuValue = ''
      this.whichAnalyze = true
      this.$emit('closeSingleDocument')
    },
    // 热词echarts
    hotWord() {
      let charts = this.$echarts.init(document.getElementById('hotWord'))
      let option = {
        color: ['#3398DB'],
        title:{
          top:'3%',
          x:'center',
          text:'公共热词',
          textStyle:{
            color:'#fff'
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
          top:'13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['改革开放', '人民', '和谐', '大力', '节能减排', '社会', '提高', '全国', '治理', '致力', '深入践行', '实体经济', '综合治理', '认真', '现代化'],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#fff' //左边线的颜色
              }
            },
            axisLabel:{
                  interval: 0,
                  formatter: function (value) {
                    //x轴的文字改为竖版显示
                    var str = value.split("");
                    return str.join("\n");
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
            data: [65, 63, 60, 58, 55, 52, 51,48,42,37,30,31,31,24,20,15]
          }
        ]
      }

      charts.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './singleDocument.scss';
</style>