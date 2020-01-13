import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout/layout'
const Login = r => require.ensure([], () => r(require('@/pages/login/login')))
const Thinking = r => require.ensure([], () => r(require('@/pages/thinking/thinking')))

export default new Router({
  mode: 'hash',
  routes: [
    { // 登录
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/thinking',
      children: [{
        path: 'thinking',
        name: 'thinking',
        component: Thinking,
        meta: {
          title: '目标思路地图'
        }
      }]
    }
  ]
})