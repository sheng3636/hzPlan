<template>
  <div class="header">
    <div class="logo">辅助规划编制系统</div>
    <nav class="nav">
      <router-link class="activeLink" to="/thinking">思路目标地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=2')">空间区域地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=3')">产业创新地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=4')">人口与公共服务地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=5')">城乡统筹地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=6')">对外开放地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=7')">资源生态环境地图</router-link>
      <router-link to="" @click.native="openNewPage('http://118.190.204.249:8103/#/home?id=8')">基础设施地图</router-link>
      <router-link to="">数据管理系统</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  methods:{
    // 打开一个新的浏览器窗口
    openNewPage(path) {
      window.open(path)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './head.scss';
</style>
