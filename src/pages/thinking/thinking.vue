<template>
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
        <select id="years">
          <option value="0">十一五规划纲要</option>
          <option value="1">十二五规划纲要</option>
          <option value="2" selected>十三五规划纲要</option>
          <option value="3">十四五规划纲要</option>
        </select>
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
              <span class="tagItem" :class="{'active':DocumentWrapData.LIFT_FLAG && DocumentWrapData.LIFT_FLAG !== '空缺'}">举起旗帜</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.FORMULATE_STRATEGY && DocumentWrapData.FORMULATE_STRATEGY !== '空缺'}">拟定战略</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.DEFINITE_REQUIREMENT && DocumentWrapData.DEFINITE_REQUIREMENT !== '空缺'}">明确要求</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.DESIGN_PATH && DocumentWrapData.DESIGN_PATH !== '空缺'}">设计路径</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.FORWARD_TASK && DocumentWrapData.FORWARD_TASK !== '空缺'}">提出任务</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.PROPOSE_MEASURE && DocumentWrapData.PROPOSE_MEASURE !== '空缺'}">提出措施</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.DESCRIBE_TARGET && DocumentWrapData.DESCRIBE_TARGET !== '空缺'}">描绘目标</span>
              <span class="tagItem" :class="{'active':DocumentWrapData.SIGNIFICANCE && DocumentWrapData.SIGNIFICANCE !== '空缺'}">指出意义</span>
            </div>
            <p class="blueLine"></p>
            <div class="constructWrap scroll">
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.LIFT_FLAG && DocumentWrapData.LIFT_FLAG !== '空缺'}">
                <p class="constructTitle">
                  <span>举起旗帜</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.LIFT_FLAG)"></i>
                  </span>
                </p>
                <p class="abstract">{{DocumentWrapData.LIFT_FLAG ? DocumentWrapData.LIFT_FLAG : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.FORMULATE_STRATEGY && DocumentWrapData.FORMULATE_STRATEGY !== '空缺'}">
                <p class="constructTitle">
                  <span>拟定战略</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.FORMULATE_STRATEGY)"></i>
                  </span>
                </p>
                <p class="abstract">{{DocumentWrapData.FORMULATE_STRATEGY ? DocumentWrapData.FORMULATE_STRATEGY : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.DEFINITE_REQUIREMENT && DocumentWrapData.DEFINITE_REQUIREMENT !== '空缺'}">
                <p class="constructTitle">
                  <span>明确要求</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.DEFINITE_REQUIREMENT)"></i>
                  </span>
                </p>
                <p class="abstract">{{DocumentWrapData.DEFINITE_REQUIREMENT ? DocumentWrapData.DEFINITE_REQUIREMENT : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.DESIGN_PATH && DocumentWrapData.DESIGN_PATH !== '空缺'}">
                <p class="constructTitle">
                  <span>设计路径</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.DESIGN_PATH)"></i>
                  </span>
                </p>
                <p class="abstract">{{DocumentWrapData.DESIGN_PATH ? DocumentWrapData.DESIGN_PATH : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.FORWARD_TASK && DocumentWrapData.FORWARD_TASK !== '空缺'}">
                <p class="constructTitle">
                  <span>提出任务</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.FORWARD_TASK)"></i>
                  </span></p>
                <p class="abstract">{{DocumentWrapData.FORWARD_TASK ? DocumentWrapData.FORWARD_TASK : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.PROPOSE_MEASURE && DocumentWrapData.PROPOSE_MEASURE !== '空缺'}">
                <p class="constructTitle">
                  <span>提出措施</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.PROPOSE_MEASURE)"></i>
                  </span></p>
                <p class="abstract">{{DocumentWrapData.PROPOSE_MEASURE ? DocumentWrapData.PROPOSE_MEASURE : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.DESCRIBE_TARGET && DocumentWrapData.DESCRIBE_TARGET !== '空缺'}">
                <p class="constructTitle">
                  
                  <span>描绘目标</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.DESCRIBE_TARGET)"></i>
                  </span>
                </p>
                <p class="abstract">{{DocumentWrapData.DESCRIBE_TARGET ? DocumentWrapData.DESCRIBE_TARGET : '空缺'}}</p>
              </div>
              <div class="constructItem1" :class="{'constructItem':DocumentWrapData.SIGNIFICANCE && DocumentWrapData.SIGNIFICANCE !== '空缺'}">
                <p class="constructTitle">
                  <span>指出意义</span>
                  <span class="contructionTool">
                    <i class="el-icon-star-off" @click="collectStatusFn"></i>
                    <i class="el-icon-edit" @click="Excerptlick(DocumentWrapData.SIGNIFICANCE)"></i>
                  </span>
                <p class="abstract">{{DocumentWrapData.SIGNIFICANCE ? DocumentWrapData.SIGNIFICANCE : '空缺'}}</p>
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
                      浙江省十三五规划纲要
                      <i class="iconfont iconduibi" @click="chooseDocumetClick"></i>
                    </h3>
                    <p
                      class="resultTxt"
                      :style="{'height':heightAuto}"
                    >“十三五”时期经济社会发展的指导思想是：高举中国特色 社会主义伟大旗帜，以马克思列宁主义、毛泽东思想、邓小平理 论、“三个代表”重要思想、科学发展观为指导，深入贯彻习近平 总书记系列重要讲话精神，以“四个全面”战略布局为统领，以 创新、协调、绿色、开放、共享五大发展理念为引领，以“八八 战略”为总纲，以“干在实处永无止境，走在前列要谋新篇”为 新使命，以“更进一步、更快一步，继续发挥先行和示范作用” 为总要求，紧紧围绕“一都三城”战略目标，</p>
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
    <div class="documentWrap" v-if="isDocumentWrap" :style="{top:documentWrapTop + 'px',left:documentWrapLeft - 550 + 'px'}">
      <div class="header">
        <span>{{DocumentWrapData.CITY_CODE}}</span>
        <span>指导思想<i class="el-icon-close" @click="DocumentWrapClose"></i></span>
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
    <my-ecollect v-if="myEcollectVisible" @closeMyEcollect="myEcollectHide" :my-ecollect-visible="myEcollectVisible" :word-cloud-data="wordCouldData"></my-ecollect>
    <!-- 上位指导选择文档弹窗 -->
    <guide-plan
      @guidePlanClose="guidePlanClose"
      :guide-plan-visible="guidePlanVisible"
    ></guide-plan>
    <!-- 报告参考政府工作报告图表 -->
    <report-chart v-if="isReportChart" :chart-data="DocumentsType"></report-chart>
    <!-- 单文件分析 -->
    <single-document
      v-if="singleDocumentVisible"
      @closeSingleDocument="closeSingleDocument"
      :single-document-visible="singleDocumentVisible"
      :word-cloud-data="wordCouldData"
    ></single-document>
    <!-- 文档上传 -->
    <upload-document
      @closeUploadDocu="closeUploadDocu"
      @submitUploadDocu="submitUploadDocu"
      :upload-docu-visible="uploadDocuVisible"
    ></upload-document>
    <!-- 添加摘要 -->
    <summary-info
      @closeSummaryInfo="closeSummaryInfo"
      @submitSummaryInfo="submitSummaryInfo"
      :summary-visible="summaryVisible"
      :summary-val="selectTxt"
    ></summary-info>
  </div>
</template>
<script>
import {
  getCiYun,
  getDocumentsType,
  collectStatus,
  saveSummaryInfo,
  login,
  getGuidingThought,
  uploadDocu,
  saveContent
} from '../../api/api'
import axios from 'axios'
import mUtilsFn from '@/config/mUtils.js'
import leftMenus from '@/components/leftMenus/leftMenus'
import myEcollect from '@/components/myEcollect/myEcollect'
import guidePlan from '@/components/guidePlan/guidePlan'
import reportChart from '@/components/reportChart/reportChart'
import singleDocument from '@/components/singleDocument/singleDocument'
import uploadDocument from '@/components/uploadDocument/uploadDocument'
import summaryInfo from '@/components/summaryInfo/summaryInfo'
export default {
  components: {
    leftMenus,
    myEcollect,
    guidePlan,
    reportChart,
    singleDocument,
    uploadDocument,
    summaryInfo
  },
  data() {
    return {
      tabActive:0,
      isDocumentWrap:false,// 地图弹窗是否显示
      documentWrapTop:null,// 地图弹窗左边位置
      documentWrapLeft:null,// 地图弹窗顶部位置
      DocumentWrapData:{},// 地图弹窗数据
      cityName: '中国',
      areaCode: 10000,
      geoJsonData: '',
      echartsMap: null, // 中间地图echarts实例
      map: null,
      district: null,
      cityCode: 100000,
      citySelect: null,
      districtSelect: null,
      opts: {},
      areaData: {},
      mapData: [],
      codeList: [],
      wordCouldData: [], // 词云数据
      isReportChart: false, // 控制报告参考政府工作报告图表显隐
      myEcollectVisible: false, // 控制我的收藏显隐
      guidePlanVisible: false, // 控制上位指导选择文档弹窗显隐
      singleDocumentVisible: false, // 控制文件分析弹窗显隐
      uploadDocuVisible: false, // 控制文档上传弹窗显隐
      summaryVisible: false, // 控制摘要弹窗显隐
      selectTxt: 'aaa', // 选中文字内容
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
      DocumentsType: {} // 各市文档报告类型数据
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
        this.search('province', 'ddd')
      }
    })
    this.echartsMap.on('click', this.echartsMapClick)
    this.getCiYunFn()
    this.getDocumentsTypeFn()
  },
  methods: {
    // 选中文字后显示菜单按钮组
    selectText(e) {
      if (document.Selection) {
        //ie浏览器
        this.selectTxt = document.selection.createRange().text
      } else {
        //标准浏览器
        this.selectTxt = window.getSelection().toString()
      }
      if (this.selectTxt !== '') {
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
    // 根据地区代码获取该地区地理经纬度范围
    loadMapData(areaCode) {
      AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, //打开事件支持
          map: this.map
        }))

        districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
          if (error) {
            console.error(error)
            return
          }
          let mapJson = {}
          mapJson.features = areaNode.getSubFeatures()

          this.loadMapChart(this.cityName, mapJson)
          this.geoJsonData = mapJson
        })
      })
    },
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
          let mapJsonList = this.geoJsonData.features
          let mapJson = {}
          for (let i in mapJsonList) {
            if (mapJsonList[i].properties.name == this.cityName) {
              mapJson.features = [].concat(mapJsonList[i])
            }
          }
          this.mapData = []
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
        this.mapData = []
        for (var i = 0, l = subList.length; i < l; i++) {
          var name = subList[i].name
          var cityCode = subList[i].adcode
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
          curList.add(contentSub)
        }
        this.loadMapData(adcode)
        this.areaData[curlevel] = curList
      }
    },
    search(area, aaa) {
      if(this.tabActive === 1 && area === 'city'){
        this.guidePlanVisible = true
      }
      let obj = this.areaData[area]
      var option = null
      if (aaa) {
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
        // tooltip: {
        //   triggerOn: 'click',
        //   padding: 0,
        //   enterable: true,
        //   transitionDuration: 1,
        //   textStyle: {
        //     color: '#000',
        //     decoration: 'none'
        //   },
        //   formatter: function(params) {
        //     console.log(params)
        //     let tipHtml = `<div class="documentWrap">
        //                         <div class="header">
        //                             <span>${params.name}</span>
        //                             <span>指导思想</span>
        //                         </div>
        //                         <div class="content scroll">“十三五”时期是全面建成小康社会的决胜阶段，我省必须肩负起“干在实处永无止境,走在前列要谋新篇”的新使命努力在提高全面建成小康社会水平上更进一步、在推进改革开放和社会主义现代化建设中更快一步，谱写美丽浙江、美好生活的新篇章。一）发展背景。“十二五”时期是我省发展很不平凡的5年。面对错综复杂的宏观环境和艰巨繁重的改革发展稳定任务，全省上下深入实施“八八战略”， 积极适应经济发展新常态，按照干好“一三五”、实现“四翻番”部署，顽强拼搏、开拓创新， 胜利实现“十二五”规划目标。综合实力迈上新台阶，2015年全省生产总值42886亿元，人均生产总值77644元。转型升级迈出新步伐，着力打好以治水为突破口的转型升级组合拳，第三产业占生产总值比重超过第二产业，工业结构调整积极推进，现代农业加快发展。创新驱动形成新格局，科技综合实力和区域创新能力继续位居全国前列。社会建设取得新进步，基本公共服务均等化水平明显提高，社会保障体系更加健全。人民生活得到新改善，城乡居民收入稳居全国前列，年人均收入4600元以下贫困现象全面消除。美丽浙江呈现新面貌，地表水和空气质量持续好转，美丽乡村建设深入推进，节能减排完成预定目标。改革开放增添新活力，全面深化改革有力推进，对外开放不断深入，平安浙江和法治浙江建设全面深化，社会主义协商民主得到加强，治理体系和治理能力现代化取得进展。社会主义核心价值观深入人心，文化软实力不断提升。
        //                         </div>
        //                       </div>`
        //     return tipHtml
        //   }
        // },
        visualMap: {
          show: false,
          inRange: {
            color: [
              '#5cd2c3',
              '#2c9a42',
              '#d08a00',
              '#07ceed',
              '#c23c33',
              '#0081ff',
              '#5dc6df',
              '#6d7de3',
              '#2bbc90',
              '#eddd12'
            ]
          }
        },
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
                color: '#ccc',
                areaColor: '#fff',
                borderColor: '#fff',
                borderWidth: 0.5,
                label: {
                  show: true,
                  textStyle: {
                    color: 'rgb(249, 249, 249)'
                  }
                }
              },
              emphasis: {
                //鼠标经过区域样式
                areaColor: false,
                borderColor: '#fff',
                areaStyle: {
                  color: '#fff'
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
      this.echartsMap.setOption(option)
    },
    // 保存摘要并关闭弹窗
    submitSummaryInfo() {
      saveContent({title:'测试标题',content:'测试正文'}).then(res => {
        this.$message({
          message: res.message,
          type: res.code === '0' ? 'success' : 'error'
        })
        if(res.code === '0'){
          this.summaryVisible = false
        }       
      })
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
    submitUploadDocu(formData) {
      uploadDocu(formData).then(res => {
        this.uploadDocuVisible = false
        this.$message({
          message: res.message,
          type: res.code === '0' ? 'success' : 'error'
        })
      })
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
    // 获取获取浙江省各市五年规划指导思想
    getGuidingThoughtFn() {
      getGuidingThought().then(res => {
        this.DocumentWrapData = res.data
        console.log(this.DocumentWrapData)
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
    chooseDocumetClick(){
      this.singleDocumentVisible = true
      this.guidePlanVisible = false
      this.isReportChart = false
    },
    // 左侧tab个项点击事件
    menusClick(data) {
      this.tabActive = data
      switch (data) {
        // case 0:
        //   this.singleDocumentVisible = true
        //   this.guidePlanVisible = false
        //   this.isReportChart = false
        //   break
        case 1:
          this.isReportChart = false
          break
        case 2:
          this.isReportChart = true
          break
      }
    },
    // 地图点击事件
    echartsMapClick(params) {
      console.log(params.data.cityCode)
     
      if(params.data.cityCode === "331000"){
        this.getGuidingThoughtFn()
        this.documentWrapTop = params.event.offsetY
        this.documentWrapLeft = params.event.offsetX
        this.isDocumentWrap = true
      }
      // this.cityName = params.data.name;
      // this.cityCode = params.data.cityCode;
      // this.district.setLevel(params.data.level); //行政区级别
      // this.district.setExtensions('all');
      //行政区查询
      //按照adcode进行查询可以保证数据返回的唯一性
    },
    DocumentWrapClose() {
      this.isDocumentWrap = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import './thinking.scss';
</style>