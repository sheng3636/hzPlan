import request from '@/utils/request'
// 登录获取token
export function login(data) {
  return request({
    url: '/system/system_spring_security',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
