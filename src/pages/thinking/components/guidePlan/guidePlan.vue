<template>
  <div>
    <el-dialog :title="guidePlantitle" :visible.sync="guidePlanVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false" custom-class="guidePlanDialog" width="55%">
      <div class="inner scroll" v-if="isArticle">
        <div class="documentInfo">
          <p class="middleLine"></p>
          <span class="infoItem">浙江省</span>
          <span class="infoItem">台州市</span>
          <span class="infoItem">2021-2025</span>
        </div>
        <ul class="documentItem">
          <li v-for="(item,index) in guideDocuCounts" :key="index">
            {{item.foldername}}
            <span @click="openDocument(item.folderno,item.foldername)">打开</span>
          </li>
        </ul>
      </div>
      <div class="inner" v-if="!isArticle" style="overflow: hidden;">
        <div class="searchWrap">
          <div class="searchInput">
            <el-input class="searchValue" placeholder="请输入搜索内容" v-model="searchValue"></el-input>
            <i class="el-icon-search" @click="showSearchResult(folderNo)"></i>
          </div>
          <p class="tabRow">
            <span class="articleType" :class="{'active':whichActive}" @click="articleTypeClick(0)">全文</span>
            <span class="articleType" :class="{'active':!whichActive}" @click="articleTypeClick(1)">指导思想</span>
          </p>
        </div>
        <div class="content scroll shortHeight" v-if="!whichActive">
          {{docuGuide}}
        </div>
        <div class="content scroll" v-if="whichActive" v-html="docuAll">
        </div>
        <ul class="searchResult" v-if="isSearchReault">
          <i class="el-icon-close" @click="closeSearchResult"></i>
          <li v-for="(item,index) in searchResult" :key="index">
            <pre v-html="item.results"></pre>
            <!-- <span>
              <i class="el-icon-star-off"></i>
              <i class="el-icon-location-outline"></i>
            </span> -->
          </li>
        </ul>
        <right-structure :docu-wrap-data="docuWrapData"></right-structure>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="guidePlanClose">取消</el-button>
      </span>
    </el-dialog>
    <!-- 添加摘要 -->
    <summary-info @closeSummaryInfo="closeSummaryInfo" @submitSummaryInfo="submitSummaryInfo"
      :summary-visible="summaryVisible" :summary-val="collectParams"></summary-info>
  </div>
</template>
<script>
import rightStructure from '../rightStructure/rightStructure'
import summaryInfo from '../summaryInfo/summaryInfo'
import { menuMixin } from '@/utils/mixin.js'
import { getGuideDocu, getGuideDocuAreaContent } from '@/api/thinkingApi'
export default {
  name: 'myEcllect',
  components: { rightStructure, summaryInfo },
  mixins: [menuMixin],
  data() {
    return {
      docuGuide: null,
      docuAll: null,
      docuWrapData: {},
      isArticle: true,
      searchValue: '',
      searchResult:[],
      folderNo: '',
      whichActive: false,
      isSearchReault: false
    }
  },
  props: {
    guidePlanVisible: {
      type: Boolean,
      default: false
    },
    guidePlantitle: {
      type: String,
      default: '请选择文档'
    },
    guideDocuCounts: {
      type: Array,
      default: []
    }
  },
  mounted() {
    console.log(this.guideDocuCounts)
  },
  methods: {
    blockToggle(event, event1) {
      this.summaryVisible = event1
      this.isMenu = event
    },
    // 查询文档内容
    showSearchResult(folderNo) {
      getGuideDocuAreaContent({
        keyword: this.searchValue,
        FOLDER_NO: folderNo
      }).then(res => {
        if (res.data.length === 0) {
          this.$message.warning('无搜索结果')
        } else {
          this.searchResult = res.data
          this.isSearchReault = true
        }
      })
    },
    closeSearchResult() {
      this.isSearchReault = false
      this.searchValue = ''
    },
    articleTypeClick(flag) {
      if (flag == 0) {
        this.whichActive = true
      } else {
        this.whichActive = false
      }
    },
    openDocument(folderno, foldername) {
      getGuideDocu({ folderno: folderno }).then(res => {
        this.folderNo = folderno
        this.isArticle = false
        this.guidePlantitle = foldername
        this.docuWrapData = res.data
        this.docuGuide = res.data.GUIDING_IDEOLOGY
        this.docuAll = res.data.HTML
      })
    },
    // 关闭上位指导弹窗
    guidePlanClose() {
      this.isArticle = true
      this.guidePlantitle = '请选择文档'
      this.closeSearchResult()
      this.$emit('guidePlanClose')
    }
  }
}
</script>
<style lang="scss" scoped>
@import './guidePlan.scss';
</style>
<style lang="scss">
.guidePlanDialog .constractArea .constructWrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-height: 205px;
  .constructItem1 {
    width: 49.5%;
  }
}
</style>