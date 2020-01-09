import {
  login
} from '@/api/user'
import {
  setToken
} from '@/utils/auth'
export default {
  async login({commit}) {
    let res = await login();
    commit('SET_TOKEN', res.data.token)
    setToken(res.data.token)
  },
  login ({ commit },loginInfo) {
    return new Promise((resolve, reject) => {
      login(loginInfo).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}