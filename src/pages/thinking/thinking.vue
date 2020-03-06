<template>
  <div class="mainWrap">
    <!-- 左侧tab切换区域 -->
    <left-menus @menusClick="menusClick"></left-menus>
    <!-- 左边下拉选择区域 -->
    <ul class="selectWrap">
      <!-- <li>
        <el-select size="small" v-model="provinceVal" value-key="cityName" @change="search('province')"
          placeholder="请选择省份">
          <el-option v-for="item in provinceOpts" :key="item.value.cityName" :label="item.cityName" :value="item.value">
          </el-option>
        </el-select>
      </li> -->
      <li>
        <el-select size="small" v-model="cityVal" value-key="cityName" @change="search('city')" placeholder="请选择城市">
          <el-option v-for="item in cityOpts" :key="item.value.cityName" :label="item.cityName" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <el-select size="small" v-model="districtVal" value-key="cityName" @change="search('district')"
          placeholder="请选择县区">
          <el-option v-for="item in districtOpts" :key="item.value.cityName" :label="item.cityName" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li>
        <el-select size="small" v-model="structureParams.file_year" placeholder="请选择">
          <el-option v-for="item in structureYears" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
    </ul>
    <!-- 中间echarts地图区域 -->
    <div id="mapChart"></div>
    <div id="mapContainer"></div>
    <!-- 左下角地图级别返回 -->
    <ul class="mapLevel">
      <!-- <li @click="mapBack('country')">中国</li> -->
      <li @click="mapBack('province')">{{provinceVal.cityName}}</li>
      <li v-if="cityVal.cityName" @click="mapBack('city')"><i class="el-icon-arrow-right"></i>{{cityVal.cityName}}
      </li>
      <li v-if="districtVal.cityName" @click="mapBack('district')"><i
          class="el-icon-arrow-right"></i>{{districtVal.cityName}}</li>
    </ul>
    <!-- 右侧区域 -->
    <div class="mainRight">
      <p class="collectWrap" @click="myCollectClick">
        <i class="el-icon-arrow-down"></i>
        <i class="el-icon-star-off"></i>
      </p>
      <ul class="rightList">
        <li>
          <h3 class="titleRow" :class="{'active':this.$store.state.leftTabActive === 0}">结构分析</h3>
          <right-structure :docu-wrap-data="docuWrapData" v-if="this.$store.state.leftTabActive === 0">
          </right-structure>
        </li>
        <li>
          <h3 class="titleRow" :class="{'active':this.$store.state.leftTabActive === 2}">智能写作</h3>
          <div class="listMain AiWirting" v-if="this.$store.state.leftTabActive === 2">
            <span class="writingUpload" @click="openUploadDocument">
              上传
              <i class="iconfont iconshangchuan"></i>
            </span>
            <el-tabs class="writingTab" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="文档素材" name="document">
                <el-input class="searchValue" placeholder="请输入搜索内容" prefix-icon="el-icon-search" v-model="searchValue">
                </el-input>
                <el-select class="documentClass" v-model="documentValue" clearable placeholder="请选择文档类别">
                  <el-option v-for="item in documentOpts" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
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
                  <div class="resultItem" v-for="(item,index) in governmentWorkReportsArr" :key="index">
                    <h3 class="resultTitle">
                      {{item.docuname}}
                      <i class="iconfont iconduibi" @click="chooseDocuClick(item.folderno)"></i>
                    </h3>
                    <p class="resultTxt" :style="{'height':heightAuto}">
                      {{item.content}}</p><span class="resultUnfold"
                      @click="unfoldClick">{{unfold === 0 ? '展开' : '收起'}}</span>
                    <p class="dateRow">2019/12/21 12:21:12</p>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="我的收藏" name="mycollect">我的收藏</el-tab-pane> -->
            </el-tabs>
          </div>
        </li>
      </ul>
    </div>
    <!-- 五年规划纲要指导思想弹窗 -->
    <div class="documentWrap" v-if="isDocuWrap"
      :style="{top:docuWrapTop + 'px',left:docuWrapLeft - 550 + 'px'}">
      <div class="header">
        <span>{{docuWrapData.DOCUNAME}}</span>
        <span>
          指导思想
          <i class="el-icon-close" @click="DocumentWrapClose"></i>
        </span>
      </div>
      <div class="content scroll">{{docuWrapData.GUIDING_IDEOLOGY}}</div>
    </div>
    <!-- 我的收藏弹窗 -->
    <my-ecollect v-if="myEcollectVisible" @closeMyEcollect="myEcollectHide" :my-ecollect-visible="myEcollectVisible"></my-ecollect>
    <!-- 上位指导选择文档弹窗 -->
    <guide-plan @guidePlanClose="guidePlanClose" :guide-plan-visible="guidePlanVisible"
      :guide-docu-counts="guideDocuCounts">
    </guide-plan>
    <!-- 报告参考政府工作报告图表 -->
    <report-chart v-if="this.$store.state.leftTabActive === 2" :chart-data="DocumentsType"></report-chart>
    <!-- 单文件分析 -->
    <docuAnalysis v-if="singleDocumentVisible" @closeSingleDocument="closeSingleDocument"
      :single-document-visible="singleDocumentVisible" :folderNo="folderno"></docuAnalysis>
    <!-- 文档上传 -->
    <upload-docu @closeUploadDocu="closeUploadDocu" @submitUploadDocu="submitUploadDocu"
      :upload-docu-visible="uploadDocuVisible"></upload-docu>
  </div>
</template>
<script>
import {
  getGuideCounts,
  getReportCounts,
  getGraphReportCounts,
  getGovernmentWorkReportsApi
} from '@/api/thinkingApi'
import { mapMixin } from '@/utils/mixin.js'
import leftMenus from './components/leftMenus/leftMenus'
import rightStructure from './components/rightStructure/rightStructure'
import myEcollect from './components/myEcollect/myEcollect'
import guidePlan from './components/guidePlan/guidePlan'
import reportChart from './components/reportChart/reportChart'
import docuAnalysis from './components/docuAnalysis/docuAnalysis'
import uploadDocu from './components/uploadDocu/uploadDocu'
export default {
  mixins: [mapMixin],
  components: {
    leftMenus,
    rightStructure,
    myEcollect,
    guidePlan,
    reportChart,
    docuAnalysis,
    uploadDocu
  },
  data() {
    return {
      structureYears: [
        // 左侧规划纲要年份下拉项
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
        city_type: '0',
        file_type: '0',
        file_year: '2016'
      },
      isDocuWrap: false, // 地图指导思想弹窗是否显示
      docuWrapTop: null, // 地图指导思想弹窗顶边位置
      docuWrapLeft: null, // 地图指导思想弹窗左部位置
      docuWrapData: {}, // 地图指导思想弹窗及右侧结构分析数据

      folderno:'',
      myEcollectList: {}, // 我的收藏数据
      guideDocuCounts: [], // 某市县区上位指导文档数量
      myEcollectVisible: false, // 控制我的收藏显隐
      guidePlanVisible: false, // 控制上位指导选择文档弹窗显隐
      singleDocumentVisible: false, // 控制文件分析弹窗显隐
      uploadDocuVisible: false, // 控制文档上传弹窗显隐
      isMenu: false, // 控制选中文字后菜单是否显示
      uploadDialog: false, // 文档上传弹窗是否显示
      unfold: 0,
      heightAuto: '',
      activeName: 'document',
      searchValue: '',
      documentOpts: [
        {
          value: '1',
          label: 'word'
        }
      ],
      documentValue: '',
      DocumentsType: {
        countsData: [],
        chartData: []
      }, // 各市文档报告类型数据

      governmentWorkReportsArr: []//报告参考右侧政府工作报告数据
    }
  },

  mounted() {
    this.getReportCountsFn('330000')
  },
  methods: {
    // 左侧tab个项点击事件
    menusClick(data) {
      switch (data) {
        case 0:
          // this.guidePlanVisible = false
          this.$store.commit('SET_LEFT_TAB_ACTIVE', 0)
          break
        case 1:
          this.DocumentWrapClose()
          this.$store.commit('SET_LEFT_TAB_ACTIVE', 1)
          break
        case 2:
          this.DocumentWrapClose()
          this.getGovernmentWorkReportsFn()
          this.$store.commit('SET_LEFT_TAB_ACTIVE', 2)
          break
      }
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
    // 获取各市文档报告类型数据
    getReportCountsFn(cityCode) {
      getReportCounts({ city_code: cityCode }).then(res => {
        this.DocumentsType.countsData = res.data
        getGraphReportCounts({ city_code: cityCode }).then(res => {
          this.DocumentsType.chartData = res.data
        })
      })
    },
    // 获取某市县区上位指导文档数量
    getGuideCounts(areaCode) {
      getGuideCounts({ city_code: areaCode }).then(res => {
        if (res.data.length != 0) {
          this.guidePlanVisible = true
          this.guideDocuCounts = res.data
        } else {
          this.$message({
            message: '该地区暂无上位指导',
            type: 'warning'
          })
          return
        }
      })
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
    // 关闭五年规划纲要地图弹窗
    DocumentWrapClose() {
      this.isDocuWrap = false
      this.docuWrapData = {}
    },
    // 报告参考-查询政府工作报告
    getGovernmentWorkReportsFn() {
      getGovernmentWorkReportsApi({ PageSize: 100, Page: 1 }).then(res => {
        this.governmentWorkReportsArr = res.data
        console.log(this.governmentWorkReportsArr)
      })
    },
    // 报告参考-打开文档对比弹窗
    chooseDocuClick(folderno) {
      this.folderno = folderno
      this.singleDocumentVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import './thinking.scss';
</style>