<template>
  <section class="app-main">
    <head-top></head-top>
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
import headTop from '@/components/header/header'
export default {
  name: 'layoutMain',
  components: {
    headTop
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
