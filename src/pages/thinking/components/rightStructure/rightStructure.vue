<template>
  <div class="listMain constractArea">
    <div class="listMain constractArea">
      <div class="tagWrap">
        <span class="tagItem" :class="{'active':docuWrapData.LIFT_FLAG && docuWrapData.LIFT_FLAG !== '空缺'}">举起旗帜</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.FORMULATE_STRATEGY && docuWrapData.FORMULATE_STRATEGY !== '空缺'}">拟定战略</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.DEFINITE_REQUIREMENT && docuWrapData.DEFINITE_REQUIREMENT !== '空缺'}">明确要求</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.DESIGN_PATH && docuWrapData.DESIGN_PATH !== '空缺'}">设计路径</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.FORWARD_TASK && docuWrapData.FORWARD_TASK !== '空缺'}">提出任务</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.PROPOSE_MEASURE && docuWrapData.PROPOSE_MEASURE !== '空缺'}">提出措施</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.DESCRIBE_TARGET && docuWrapData.DESCRIBE_TARGET !== '空缺'}">描绘目标</span>
        <span class="tagItem"
          :class="{'active':docuWrapData.SIGNIFICANCE && docuWrapData.SIGNIFICANCE !== '空缺'}">指出意义</span>
      </div>
      <p class="blueLine"></p>
      <div class="constructWrap scroll">
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.LIFT_FLAG && docuWrapData.LIFT_FLAG !== '空缺'}">
          <p class="constructTitle">
            <span>举起旗帜</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('举起旗帜',docuWrapData.LIFT_FLAG)"></i>
              <i class="el-icon-edit" @click="editCollect('举起旗帜',docuWrapData.LIFT_FLAG,docuWrapData.DOCUNAME,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'举起旗帜',docuWrapData.DOCUNAME)">{{docuWrapData.LIFT_FLAG ? docuWrapData.LIFT_FLAG : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.FORMULATE_STRATEGY && docuWrapData.FORMULATE_STRATEGY !== '空缺'}">
          <p class="constructTitle">
            <span>拟定战略</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('拟定战略',docuWrapData.FORMULATE_STRATEGY)"></i>
              <i class="el-icon-edit" @click="editCollect('拟定战略',docuWrapData.FORMULATE_STRATEGY,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'拟定战略',docuWrapData.DOCUNAME)">
            {{docuWrapData.FORMULATE_STRATEGY ? docuWrapData.FORMULATE_STRATEGY : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.DEFINITE_REQUIREMENT && docuWrapData.DEFINITE_REQUIREMENT !== '空缺'}">
          <p class="constructTitle">
            <span>明确要求</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('明确要求',docuWrapData.DEFINITE_REQUIREMENT)"></i>
              <i class="el-icon-edit" @click="editCollect('明确要求',docuWrapData.DEFINITE_REQUIREMENT,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'明确要求',docuWrapData.DOCUNAME)">
            {{docuWrapData.DEFINITE_REQUIREMENT ? docuWrapData.DEFINITE_REQUIREMENT : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.DESIGN_PATH && docuWrapData.DESIGN_PATH !== '空缺'}">
          <p class="constructTitle">
            <span>设计路径</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('设计路径',docuWrapData.DESIGN_PATH)"></i>
              <i class="el-icon-edit" @click="editCollect('设计路径',docuWrapData.DESIGN_PATH,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'设计路径',docuWrapData.DOCUNAME)">{{docuWrapData.DESIGN_PATH ? docuWrapData.DESIGN_PATH : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.FORWARD_TASK && docuWrapData.FORWARD_TASK !== '空缺'}">
          <p class="constructTitle">
            <span>提出任务</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('提出任务',docuWrapData.FORWARD_TASK)"></i>
              <i class="el-icon-edit" @click="editCollect('提出任务',docuWrapData.FORWARD_TASK,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'提出任务',docuWrapData.DOCUNAME)">{{docuWrapData.FORWARD_TASK ? docuWrapData.FORWARD_TASK : '空缺'}}
          </p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.PROPOSE_MEASURE && docuWrapData.PROPOSE_MEASURE !== '空缺'}">
          <p class="constructTitle">
            <span>提出措施</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('提出措施',docuWrapData.PROPOSE_MEASURE)"></i>
              <i class="el-icon-edit" @click="editCollect('提出措施',docuWrapData.PROPOSE_MEASURE,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'提出措施',docuWrapData.DOCUNAME)">
            {{docuWrapData.PROPOSE_MEASURE ? docuWrapData.PROPOSE_MEASURE : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.DESCRIBE_TARGET && docuWrapData.DESCRIBE_TARGET !== '空缺'}">
          <p class="constructTitle">
            <span>描绘目标</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('描绘目标',docuWrapData.DESCRIBE_TARGET)"></i>
              <i class="el-icon-edit" @click="editCollect('描绘目标',docuWrapData.DESCRIBE_TARGET,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'描绘目标',docuWrapData.DOCUNAME)">
            {{docuWrapData.DESCRIBE_TARGET ? docuWrapData.DESCRIBE_TARGET : '空缺'}}</p>
        </div>
        <div class="constructItem1"
          :class="{'constructItem':docuWrapData.SIGNIFICANCE && docuWrapData.SIGNIFICANCE !== '空缺'}">
          <p class="constructTitle">
            <span>指出意义</span>
            <span class="contructionTool">
              <i class="el-icon-star-off" @click="collectStatusFn('指出意义',docuWrapData.SIGNIFICANCE)"></i>
              <i class="el-icon-edit" @click="editCollect('指出意义',docuWrapData.SIGNIFICANCE,docuWrapData.DOCUNAME,'')"></i>
            </span>
          </p>
          <p class="abstract" @mouseup="selectText($event,'指出意义',docuWrapData.DOCUNAME)">{{docuWrapData.SIGNIFICANCE ? docuWrapData.SIGNIFICANCE : '空缺'}}
          </p>
        </div>
      </div>
    </div>
    <!-- 添加摘要 -->
    <summary-info @closeSummaryInfo="closeSummaryInfo" @submitSummaryInfo="submitSummaryInfo"
      :summary-visible="summaryVisible" :summary-val="collectParams"></summary-info>
    <!-- 选择文字后弹出菜单 -->
    <select-menus :menu-top1="menuTop" :menu-left1="menuLeft" :summary-val="collectParams" @blockToggle="blockToggle" v-if="isMenu"></select-menus>
  </div>
</template>
<script>
import { saveContent } from '@/api/thinkingApi'
import { collectStatus } from '@/api/api'
import summaryInfo from '../summaryInfo/summaryInfo'
import selectMenus from '../selectMenus/selectMenus'
import {menuMixin} from '@/utils/mixin.js'
export default {
  name: 'rightStructure',
  components: { summaryInfo, selectMenus },
  mixins: [menuMixin],
  data() {
    return {
    }
  },
  props: {
    docuWrapData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    
  },
  methods: {
    blockToggle (event,event1) {
      this.isMenu = event
      this.summaryVisible = event1
    },
    // 直接收藏收藏
    collectStatusFn(title, content) {
      this.collectParams.title = title
      this.collectParams.content = content
      this.collectParams.source = this.docuWrapData.DOCUNAME
      saveContent(this.collectParams).then(res => {
        this.$message({
          message: res.message,
          type: res.code === '0' ? 'success' : 'error'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './rightStructure.scss';
</style>