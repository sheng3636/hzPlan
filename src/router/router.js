import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Thinking = r => require.ensure([], () => r(require('@/pages/thinking/thinking')))

export default new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/thinking'
    },
    { // 首页
      path: '/thinking',
      name: 'Thinking',
      component: Thinking
    }
  ]
})