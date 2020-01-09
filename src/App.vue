<template>
  <div class="pageHtml">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss">
@import "./assets/style/common.scss";
</style>
