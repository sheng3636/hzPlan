import request from '@/utils/request'

export function getDocuInfo() {
  return request({
    url: '/system/system_spring_security',
    method: 'get'
  })
}

export function saveContent(data) {
  return request({
    url: '/programme/word/save_content',
    method: 'post',
    data
  })
}
