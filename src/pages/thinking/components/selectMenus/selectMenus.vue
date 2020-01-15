<template>
  <div>
    <!-- 选择文字弹出的菜单 -->
    <ul class="selectmenu" :style="{top:menuTop1 + 'px',left:menuLeft1 + 'px'}">
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
  </div>
</template>
<script>
import {menuMixin} from '@/utils/mixin.js'
export default {
  name: 'selectMenus',
  mixins: [menuMixin],
  data() {
    return {
      
    }
  },
  props: {
    menuTop1: {
      type:Number,
      default:0
    },
    menuLeft1: {
      type:Number,
      default:0
    },
    summaryVal:{
      type: Object,
      default: {}
    }
  },
  mounted() {
  },
  methods: {
    // 显示摘编输入框
    Excerptlick(val) {
      this.$emit('blockToggle', false,true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './selectMenus.scss';
</style>