<template>
  <div>
    <div class="mainWrap">
      <!-- 中间echarts地图区域 -->
      <div id="mapChart"></div>
      <div id="mapContainer"></div>
      <!-- 左侧tab切换区域 -->
      <left-menus @menusClick="menusClick"></left-menus>
      <!-- 左边选择区域 -->
      <ul class="selectWrap">
        <li>
          <select id="province" @change="search('province')"></select>
        </li>
        <li>
          <select id="city" @change="search('city')"></select>
        </li>
        <li>
          <select id="district" @change="search('district')"></select>
        </li>
        <li>
          <el-select v-model="structureParams.file_year" placeholder="请选择">
            <el-option
              v-for="item in structureYears"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <el-button size="mini" @click="saveAsImage">导出地图</el-button>
        </li>
      </ul>
      <!-- 右侧区域 -->
      <div class="mainRight" @mouseup="selectText">
        <p class="collectWrap" @click="myCollectClick">
          <i class="el-icon-arrow-down"></i>
          <i class="el-icon-star-off"></i>
        </p>
        <ul class="rightList">
          <li>
            <h3 class="titleRow" :class="{'active':rightHistoryTab}" @click="historyTabClick">结构分析</h3>
            <div class="listMain constractArea" v-if="rightHistoryTab">
              <div class="tagWrap">
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.LIFT_FLAG && DocumentWrapData.LIFT_FLAG !== '空缺'}"
                >举起旗帜</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.FORMULATE_STRATEGY && DocumentWrapData.FORMULATE_STRATEGY !== '空缺'}"
                >拟定战略</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.DEFINITE_REQUIREMENT && DocumentWrapData.DEFINITE_REQUIREMENT !== '空缺'}"
                >明确要求</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.DESIGN_PATH && DocumentWrapData.DESIGN_PATH !== '空缺'}"
                >设计路径</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.FORWARD_TASK && DocumentWrapData.FORWARD_TASK !== '空缺'}"
                >提出任务</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.PROPOSE_MEASURE && DocumentWrapData.PROPOSE_MEASURE !== '空缺'}"
                >提出措施</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.DESCRIBE_TARGET && DocumentWrapData.DESCRIBE_TARGET !== '空缺'}"
                >描绘目标</span>
                <span
                  class="tagItem"
                  :class="{'active':DocumentWrapData.SIGNIFICANCE && DocumentWrapData.SIGNIFICANCE !== '空缺'}"
                >指出意义</span>
              </div>
              <p class="blueLine"></p>
              <div class="constructWrap scroll">
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.LIFT_FLAG && DocumentWrapData.LIFT_FLAG !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>举起旗帜</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.LIFT_FLAG)"></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.LIFT_FLAG ? DocumentWrapData.LIFT_FLAG : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.FORMULATE_STRATEGY && DocumentWrapData.FORMULATE_STRATEGY !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>拟定战略</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i
                        class="el-icon-edit"
                        @click="Excerptlick(DocumentWrapData.FORMULATE_STRATEGY)"
                      ></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.FORMULATE_STRATEGY ? DocumentWrapData.FORMULATE_STRATEGY : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.DEFINITE_REQUIREMENT && DocumentWrapData.DEFINITE_REQUIREMENT !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>明确要求</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i
                        class="el-icon-edit"
                        @click="Excerptlick(DocumentWrapData.DEFINITE_REQUIREMENT)"
                      ></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.DEFINITE_REQUIREMENT ? DocumentWrapData.DEFINITE_REQUIREMENT : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.DESIGN_PATH && DocumentWrapData.DESIGN_PATH !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>设计路径</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.DESIGN_PATH)"></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.DESIGN_PATH ? DocumentWrapData.DESIGN_PATH : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.FORWARD_TASK && DocumentWrapData.FORWARD_TASK !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>提出任务</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.FORWARD_TASK)"></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.FORWARD_TASK ? DocumentWrapData.FORWARD_TASK : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.PROPOSE_MEASURE && DocumentWrapData.PROPOSE_MEASURE !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>提出措施</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i
                        class="el-icon-edit"
                        @click="Excerptlick(DocumentWrapData.PROPOSE_MEASURE)"
                      ></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.PROPOSE_MEASURE ? DocumentWrapData.PROPOSE_MEASURE : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.DESCRIBE_TARGET && DocumentWrapData.DESCRIBE_TARGET !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>描绘目标</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i
                        class="el-icon-edit"
                        @click="Excerptlick(DocumentWrapData.DESCRIBE_TARGET)"
                      ></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.DESCRIBE_TARGET ? DocumentWrapData.DESCRIBE_TARGET : '空缺'}}</p>
                </div>
                <div
                  class="constructItem1"
                  :class="{'constructItem':DocumentWrapData.SIGNIFICANCE && DocumentWrapData.SIGNIFICANCE !== '空缺'}"
                >
                  <p class="constructTitle">
                    <span>指出意义</span>
                    <span class="contructionTool">
                      <i class="el-icon-star-off" @click="collectStatusFn"></i>
                      <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.SIGNIFICANCE)"></i>
                    </span>
                  </p>
                  <p
                    class="abstract"
                  >{{DocumentWrapData.SIGNIFICANCE ? DocumentWrapData.SIGNIFICANCE : '空缺'}}</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <h3 class="titleRow" :class="{'active':!rightHistoryTab}" @click="historyTabClick">智能写作</h3>
            <div class="listMain AiWirting" v-if="!rightHistoryTab">
              <span class="writingUpload" @click="openUploadDocument">
                上传
                <i class="iconfont iconshangchuan"></i>
              </span>
              <el-tabs class="writingTab" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="文档素材" name="document">
                  <el-input
                    class="searchValue"
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="searchValue"
                  ></el-input>
                  <el-select
                    class="documentClass"
                    v-model="documentValue"
                    clearable
                    placeholder="请选择文档类别"
                  >
                    <el-option
                      v-for="item in documentOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <div class="matterClass">
                    <span class="matterItem">社会主义</span>
                    <span class="matterItem">指导思想</span>
                    <span class="matterItem">马克思</span>
                    <span class="matterItem">列宁主义</span>
                    <span class="matterItem">毛泽东思想</span>
                    <span class="matterItem">邓小平理论</span>
                    <span class="matterItem">深入贯彻</span>
                    <span class="matterItem">紧紧围绕</span>
                    <span class="matterItem">发展理念</span>
                    <span class="matterItem">示范作用</span>
                    <span class="matterItem">战略目标</span>
                    <span class="matterItem">总纲</span>
                  </div>
                  <div class="searchResultWrap scroll">
                    <div class="resultItem">
                      <h3 class="resultTitle">
                        2018政府工作报告
                        <i class="iconfont iconduibi" @click="chooseDocumetClick"></i>
                      </h3>
                      <p
                        class="resultTxt"
                        :style="{'height':heightAuto}"
                      >2017年是本届政府任期的第一年。市政府认真贯彻落实省委省政府和市委的决策部署，坚定不移沿着“八八战略”指引的路子走下去，围绕建设独具魅力的“山海水城、和合圣地、制造之都”目标，拉高标杆、争先进位，勇当排头兵、再创新辉煌，奋力推进“三大历史任务”，圆满完成了市五届人大一次会议确定的目标任务，办成了一些多年想办而没有办成的大事，解决了一些长期想解决而没有解决的难题，取得了新世纪以来最好的成绩单，多项主要指标增速全省领先，生产总值增长8.1%，财政总收入增长 12.5%，一般公共预算收入增长 11.1%，城乡居民人均可支配收入分别增长 8.9%和 9.5%。台州正朝着高水平全面建成小康社会胜利前进。 这一年，我们着力深化供给侧结构性改革，产业转型升级迈出新步伐。积极实施先进制造业“十大行动”，制造之都建设扎实推进。规上工业增加值增长11.6%，居全省第一。发力高端制造，天鹰无人机成功下线，航空特色小镇建设进展顺利，机器人产业快速发展。吉利汽车临海产业园提前形成 20 万辆产能，领克 01在路桥基地量产销售，全产业链汽车城建设加快推进。重大产业 项目势头喜人，华海制药科技产业园破土动工，华强方特主题公 园顺利签约。加大倒逼转型力度，推进“亩均论英雄”。新增制造 业单项冠军示范企业3家。滚动实施小微企业三年成长计划，新 增小微企业 2.6 万家，“个转企”3435 家，建成小微企业园 109 个，入驻企业 4612 家。推进“两化”融合，新增上云企业 7800 家。深化“三强一制造”建设，启动全国首个智能马桶质量攻坚 行动计划，新增国家级产品质量提升示范区3个、“浙江制造”标 准17项，新增“浙江制造”认证企业数居全省第一。天台成为全 国质量强市示范城市创建城市。温岭列入全省首批军民融合创新 示范区创建名单。实施“128”股改上市三年行动计划，出台股改 新政和上市新政双 10 条，新增股份制企业 600 家、上市企业 11 家，上市企业总数 52 家，其中 A 股上市企业数居全国地级市第 四。实施“瞪羚企业”培育计划，首批入选企业33家。加大惠企 力度，减免各类税费122亿元。成立台州民营经济学院，突出创 二代培训，推动“薪火相传”。推动金融、物流、电商、文化等产 业发展，加快建设省级现代服务业集聚示范区，中国模具博览城 投用。积极推进旅游强市建设，柔川、南屏景区被评为 4A 级景 区，桃渚景区列入国家级风景名胜区。现代农业“两区”建设成 效明显，建成粮食生产功能区7.3万亩、省级现代农业园区2个， 全国农业标准化示范区达13个，获省农博会金奖农产品数连续十 五年居全省第一，获国字号渔业品牌6个，成为全省唯一省级农 机博览会举办地。率先出台绿色食品质量安全责任保险政策，有 效构建四级联动的农产品质量安全监管体系。成功创建国家新型 职业农民培训示范基地。</p>
                      <span class="resultUnfold" @click="unfoldClick">{{unfold === 0 ? '展开' : '收起'}}</span>
                      <p class="dateRow">2019/12/21 12:21:12</p>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="我的收藏" name="mycollect">我的收藏</el-tab-pane>
              </el-tabs>
            </div>
          </li>
        </ul>
      </div>
      <!-- 五年规划纲要指导思想弹窗 -->
      <div
        class="documentWrap"
        v-if="isDocumentWrap"
        :style="{top:documentWrapTop + 'px',left:documentWrapLeft - 550 + 'px'}"
      >
        <div class="header">
          <span>{{DocumentWrapData.DOCUNAME}}</span>
          <span>
            指导思想
            <i class="el-icon-close" @click="DocumentWrapClose"></i>
          </span>
        </div>
        <div class="content scroll">{{DocumentWrapData.GUIDING_IDEOLOGY}}</div>
      </div>
      <!-- 选择文字弹出的菜单 -->
      <ul class="selectmenu" v-if="isMenu" :style="{top:menuTop + 'px',left:menuLeft + 'px'}">
        <li>
          <i class="el-icon-star-off"></i>收藏
        </li>
        <li @click="Excerptlick(selectTxt)">
          <i class="el-icon-edit"></i>摘编
        </li>
        <li>
          <i class="el-icon-search"></i>搜索
        </li>
      </ul>
      <!-- 我的收藏弹窗 -->
      <my-ecollect
        v-if="myEcollectVisible"
        @closeMyEcollect="myEcollectHide"
        :my-ecollect-visible="myEcollectVisible"
        :word-cloud-data="wordCouldData"
      ></my-ecollect>
      <!-- 上位指导选择文档弹窗 -->
      <guide-plan
        @guidePlanClose="guidePlanClose"
        @fatherMethod="selectText"
        :guide-plan-visible="guidePlanVisible"
      ></guide-plan>
      <!-- 报告参考政府工作报告图表 -->
      <report-chart v-if="isReportChart" :chart-data="DocumentsType"></report-chart>
      <!-- 单文件分析 -->
      <single-document
        v-if="singleDocumentVisible"
        @closeSingleDocument="closeSingleDocument"
        :single-document-title="singleDocumentTitle"
        :single-document-visible="singleDocumentVisible"
        :word-cloud-data="wordCouldData"
      ></single-document>
      <!-- 文档上传 -->
      <upload-docu
        @closeUploadDocu="closeUploadDocu"
        @submitUploadDocu="submitUploadDocu"
        :upload-docu-visible="uploadDocuVisible"
      ></upload-docu>
      <!-- 添加摘要 -->
      <summary-info
        @closeSummaryInfo="closeSummaryInfo"
        @submitSummaryInfo="submitSummaryInfo"
        :summary-visible="summaryVisible"
        :summary-val="selectTxt"
      ></summary-info>
    </div>
  </div>
</template>
<script>
import {
  getCiYun,
  getDocumentsType,
  collectStatus,
  saveSummaryInfo,
  login
} from '../../api/api'
import { getStructure } from '@/api/thinkingApi'
import axios from 'axios'
import mUtilsFn from '@/config/mUtils.js'
import leftMenus from './components/leftMenus/leftMenus'
import myEcollect from '@/components/myEcollect/myEcollect'
import guidePlan from '@/components/guidePlan/guidePlan'
import reportChart from '@/components/reportChart/reportChart'
import singleDocument from '@/components/singleDocument/singleDocument'
import uploadDocu from './components/uploadDocu/uploadDocu'
import summaryInfo from './components/summaryInfo/summaryInfo'
export default {
  components: {
    leftMenus,
    myEcollect,
    guidePlan,
    reportChart,
    singleDocument,
    uploadDocu,
    summaryInfo
  },
  data() {
    return {
      singleDocumentTitle: '2018政府工作报告',
      leftTabActive: 0,
      isDocumentWrap: false, // 地图弹窗是否显示
      documentWrapTop: null, // 地图弹窗左边位置
      documentWrapLeft: null, // 地图弹窗顶部位置
      DocumentWrapData: {}, // 地图弹窗数据wordCouldData: [], // 词云数据
      isReportChart: false, // 控制报告参考政府工作报告图表显隐
      myEcollectVisible: false, // 控制我的收藏显隐
      guidePlanVisible: false, // 控制上位指导选择文档弹窗显隐
      singleDocumentVisible: false, // 控制文件分析弹窗显隐
      uploadDocuVisible: false, // 控制文档上传弹窗显隐
      summaryVisible: false, // 控制摘要弹窗显隐
      selectTxt: '', // 选中文字内容
      isMenu: false, // 控制选中文字后菜单是否显示
      menuTop: null,
      menuLeft: null,
      uploadDialog: false, // 文档上传弹窗是否显示
      unfold: 0,
      heightAuto: '',
      activeName: 'document',
      searchValue: '',
      rightHistoryTab: true, // 控制基本思路分析中历史借鉴的结构分析智能写作显隐
      documentOpts: [
        {
          value: '1',
          label: 'word'
        }
      ],
      documentValue: '',
      DocumentsType: {}, // 各市文档报告类型数据
      structureYears: [
        {
          value: '2006',
          label: '十一五规划纲要'
        },
        {
          value: '2011',
          label: '十二五规划纲要'
        },
        {
          value: '2016',
          label: '十三五规划纲要'
        },
        {
          value: '2021',
          label: '十四五规划纲要'
        }
      ],
      structureParams: {
        // 获取各市县五年规划纲要指导思想参数
        city_code: null,
        file_type: '0',
        file_year: '2016'
      },

      cityName: '中国',
      geoJsonData: '',
      echartsMap: null, // 中间地图echarts实例
      map: null,
      district: null,
      cityCode: 330000,
      citySelect: null,// 城市下拉选择框
      districtSelect: null,// 县城下拉选择框
      areaData: {},
      mapData: [],
    }
  },

  mounted() {
    this.citySelect = document.getElementById('city')
    this.districtSelect = document.getElementById('district')
    this.echartsMap = this.$echarts.init(document.getElementById('mapChart'))
    // 初始化地图
    this.map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      center: [116.30946, 39.937629],
      zoom: 3
    })
    let opts = {
      subdistrict: 1, // 显示下级行政区级数
      showbiz: false // 是否显示商圈
    }
    this.district = new AMap.DistrictSearch(opts) //注意：需要使用插件同步下发功能才能这样直接使用
    this.district.search('中国', (status, result) => {
      if (status == 'complete') {
        this.getData(result.districtList[0], '', 100000)
        this.search('province', 'checkedCity')
      }
    })
    this.echartsMap.on('click', this.echartsMapClick)
    this.getCiYunFn()
    this.getDocumentsTypeFn()
  },
  methods: {
    // 选中文字后显示菜单按钮组
    selectText(e) {
      console.log(e)

      if (document.Selection) {
        //ie浏览器
        this.selectTxt = document.selection.createRange().text
      } else {
        //标准浏览器
        this.selectTxt = window.getSelection().toString()
      }
      if (this.selectTxt != '') {
        this.isMenu = true
        this.menuTop = e.clientY - 65
        this.menuLeft = e.clientX
      } else {
        this.isMenu = false
      }
    },
    // 显示摘编输入框
    Excerptlick(val) {
      this.summaryVisible = true
      this.isMenu = false
      this.selectTxt = val
      console.log('b' + this.selectTxt)
    },
    // 文档素材展开收起
    unfoldClick() {
      if (this.unfold === 0) {
        this.unfold = 1
        this.heightAuto = 'auto'
      } else {
        this.unfold = 0
        this.heightAuto = ''
      }
    },
    // 右侧历史借鉴中智能写作tab切换
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 右侧历史借鉴tab切换
    historyTabClick() {
      this.rightHistoryTab = !this.rightHistoryTab
    },
    // 保存摘要并关闭弹窗
    submitSummaryInfo() {
      this.summaryVisible = false
    },
    // 打开文档上传弹窗
    openUploadDocument() {
      this.uploadDocuVisible = true
    },
    // 关闭文档上传弹窗
    closeUploadDocu() {
      this.uploadDocuVisible = false
    },
    // 提交上传文档表单
    submitUploadDocu() {
      this.uploadDocuVisible = false
    },
    // 获取文档分析词云数据
    getCiYunFn() {
      getCiYun().then(res => {
        this.wordCouldData = res.data
      })
    },
    // 获取各市文档报告类型数据
    getDocumentsTypeFn() {
      getDocumentsType().then(res => {
        this.DocumentsType = res.data
      })
    },
    // 收藏请求状态
    collectStatusFn() {
      collectStatus().then(res => {
        this.$message({
          message: res.message,
          type: res.code == 0 ? 'success' : 'error'
        })
      })
    },
    // 将中间图表导出为图片
    saveAsImage() {
      mUtilsFn.saveAsImage(this.echartsMap)
    },
    // 关闭摘要弹窗
    closeSummaryInfo() {
      this.summaryVisible = false
    },
    // 打开我的收藏弹窗
    myCollectClick() {
      this.myEcollectVisible = true
    },
    // 关闭我的收藏窗口
    myEcollectHide() {
      this.myEcollectVisible = false
    },
    // 关闭选择文档弹窗
    guidePlanClose() {
      this.guidePlanVisible = false
    },
    // 关闭文档分析弹窗
    closeSingleDocument() {
      this.singleDocumentVisible = false
    },
    chooseDocumetClick() {
      this.singleDocumentVisible = true
      this.guidePlanVisible = false
      this.isReportChart = false
    },
    // 左侧tab个项点击事件
    menusClick(data) {
      this.leftTabActive = data
      switch (data) {
        case 0:
          this.guidePlanVisible = false
          this.isReportChart = false
          break
        case 1:
          this.isReportChart = false
          break
        case 2:
          this.isReportChart = true
          break
      }
    },
    // 关闭五年规划纲要地图弹窗
    DocumentWrapClose() {
      this.isDocumentWrap = false
      this.DocumentWrapData = {}
    },
    /*
      利用 AMapUI.loadUI可以构造一个创建一个 DistrictExplorer 实例，然后利用 DistrictExplorer 的实例，
      可以根据当前需要加载城市的 areaCode获取到该城市的 geo 数据
    */
    loadMapData(areaCode) {
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: this.map
        }))
        // 创建一个实例
        districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
          if (error) {
            console.error(error)
            return
          }
          let mapJson = {}
          // 特别注意这里哦，如果查看过正常的geojson文件，都会发现，文件都是以features 字段开头的，所以这里要记得加上
          mapJson.features = areaNode.getSubFeatures()

          this.loadMapChart(this.cityName, mapJson)
          this.geoJsonData = mapJson
        })
      })
    },
    // 处理获取出来的边界数据
    getData(data, level, adcode) {
      // 清空下一级别的下拉列表
      if (level === 'province') {
        this.citySelect.innerHTML = ''
        this.districtSelect.innerHTML = ''
      } else if (level === 'city') {
        this.districtSelect.innerHTML = ''
      }

      var subList = data.districtList
      if (subList) {
        var contentSub = new Option('--请选择--')
        var curlevel = subList[0].level
        if (curlevel === 'street') {
          // 为了配合echarts地图区县名称显示正常，这边街道级别数据需要特殊处理
          let mapJsonList = this.geoJsonData.features
          let mapJson = {}
          for (let i in mapJsonList) {
            if (mapJsonList[i].properties.name == this.cityName) {
              mapJson.features = [].concat(mapJsonList[i])
            }
          }
          this.mapData = []
          // 这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
          this.mapData.push({
            name: this.cityName,
            value: Math.random() * 100,
            level: curlevel
          })
          this.loadMapChart(this.cityName, mapJson)
          this.geoJsonData = mapJson
          return
        }
        var curList = document.querySelector('#' + curlevel)
        curList.add(contentSub)
        // 街道级以上的数据处理方式
        this.mapData = []
        for (var i = 0, l = subList.length; i < l; i++) {
          var name = subList[i].name
          var cityCode = subList[i].adcode
          // 这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
          this.mapData.push({
            name: name,
            value: Math.random() * 100,
            cityCode: cityCode,
            level: curlevel
          })
          var levelSub = subList[i].level
          contentSub = new Option(name)
          contentSub.setAttribute('value', levelSub)
          contentSub.center = subList[i].center
          contentSub.adcode = subList[i].adcode
          if (contentSub.adcode == 330000) {
            contentSub.selected = true
          }
          curList.add(contentSub)
        }
        this.loadMapData(adcode)
        this.areaData[curlevel] = curList
      }
    },
    search(area, checkedCity) {
      if (this.leftTabActive === 1 && area === 'city') {
        this.guidePlanVisible = true
      }
      let obj = this.areaData[area]
      var option = null
      if (checkedCity) {
        option = obj[23]
      } else {
        var option = obj[obj.options.selectedIndex]
      }

      var adcode = option.adcode
      this.cityName = option.text
      this.cityCode = adcode
      this.district.setLevel(option.value) //行政区级别
      this.district.setExtensions('all')
      //行政区查询
      //按照adcode进行查询可以保证数据返回的唯一性
      this.district.search(adcode, (status, result) => {
        if (status === 'complete') {
          this.getData(result.districtList[0], obj.id, adcode)
        }
      })
    },
    // 渲染地图echarts
    loadMapChart(mapName, data) {
      this.$echarts.registerMap(mapName, data)
      var option = {
        series: [
          {
            name: '数据名称',
            type: 'map',
            roam: true, // 是否开启鼠标缩放和平移漫游
            mapType: mapName,
            selectedMode: 'single', // 表示是否支持多个选中
            showLegendSymbol: false, // 在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 legend 组件时生效。
            itemStyle: {
              normal: {
                areaColor: 'rgba(16,72,133)',
                borderColor: 'rgba(51, 136, 255)',
                borderWidth: 2,
                label: {
                  show: true,
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                }
              },
              emphasis: {
                //鼠标经过区域样式
                areaColor: 'rgba(11,55,98)',
                borderColor: 'rgba(11,234,235)',
                areaStyle: {
                  color: 'rgba(11,55,98)'
                },
                label: {
                  show: true,
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                }
              }
            },
            data: this.mapData
          }
        ]
      }
      this.echartsMap.clear()
      this.echartsMap.setOption(option)
    },
    // 地图点击事件-获取各市县五年规划纲要指导思想
    echartsMapClick(params) {
      if (this.leftTabActive === 0) {
        this.structureParams.city_code = params.data.cityCode
        getStructure(this.structureParams).then(res => {
          if (res.data) {
            this.documentWrapTop = params.event.offsetY
            this.documentWrapLeft = params.event.offsetX
            this.DocumentWrapData = res.data
            this.isDocumentWrap = true
          } else {
            this.$message({
              message: '该地区未在该时段上传文档',
              type: 'warning'
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './thinking.scss';
</style>