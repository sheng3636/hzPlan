<template>
  <ul class="mainLeft">
    <li>
      <h3 class="titleRow" :class="{'active':leftShow}" @click="tabClick(0)">
        <i class="iconfont iconchuzhisilu"></i>基本思路分析
      </h3>
      <ul class="listMain" v-if="leftShow">
        <!-- <el-tree :data="treeMuneData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        <li :class="{'active':whichSelect === 0}" @click="whichMenu(0)">历史借鉴</li>
        <li :class="{'active':whichSelect === 1}" @click="whichMenu(1)">上位指导</li>
        <li :class="{'active':whichSelect === 2}" @click="whichMenu(2)">报告参考</li>
      </ul>
    </li>
    <li>
      <h3 class="titleRow" :class="{'active':!leftShow}" @click="tabClick(1)">
        <i class="iconfont iconmubiao"></i>发展目标分析
      </h3>
      <!-- <div class="listMain" v-if="!leftShow"> -->
        <!-- <el-tree :data="treeMuneData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
      <!-- </div> -->
    </li>
  </ul>
</template>
<script>
export default {
  name: 'leftMenus',
  data() {
    return {
      whichSelect:0,
      leftShow: true, // 控制基本思路分析列表、发展目标分析列表显隐
    }
  },
  methods: {
    tabClick(flag){
      if(flag === 0) {
        this.leftShow = true
      } else {
        this.leftShow = false
        window.location.href="http://139.196.226.113/ditu/?id=1"
      }
    },
    // 点击左侧tab向父组件传递节点信息
    whichMenu(data) {
      this.$emit('menusClick', data)
      this.whichSelect = data
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import './leftMenus.scss';
</style>