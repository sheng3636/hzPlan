import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'
import {
  getToken
} from '@/utils/auth'
Vue.use(Vuex)
const state = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    leftTabActive: 0 // 左侧基本思路分析列表选中项
  }
}

export default new Vuex.Store({
  getters,
  state,
  actions,
  mutations
})