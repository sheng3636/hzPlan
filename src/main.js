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

router.beforeEach((to, from, next) => {
  // 页面标题
  if (!to.meta.title) {
    document.title = "浙江省发展规划院"
  } else {
    document.title = to.meta.title
  }

  if (to.matched.length === 0) { // 如果未匹配到路由
    from.path ? next({
      path: from.path
    }) : next('/'); // 如果上级也未匹配到路由则跳转主页面，如果上级能匹配到则转上级路由
  } else {
    next() // 如果匹配到正确跳转
  }
  const whiteList = ['/login'] // no redirect whitelist
  const hasToken = getToken() // determine whether the user has logged in
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
