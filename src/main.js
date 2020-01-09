// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import { getToken } from '@/utils/auth' // get token from cookie
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

const whiteList = ['/login'] // no redirect whitelist
// router.beforeEach((to, from, next) => {
//   // 页面标题
//   if (!to.meta.title) {
//     document.title = "浙江省发展规划院"
//   } else {
//     document.title = to.meta.title
//   }
  
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
