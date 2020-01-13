import request from '@/utils/request'
// 获取文档上传下拉框数据
export function getDocuInfo() {
  return request({
    url: '/programme/word/findByBusesice',
    method: 'get'
  })
}
// 保存摘要
export function saveContent(data) {
  return request({
    url: '/programme/word/save_content',
    method: 'post',
    data
  })
}
// 提交上传文档
export function uploadDocu(data) {
  return request({
    url: '/programme/word/saveStructure',
    method: 'post',
    data
  })
}
// 根据城市编码获取该城市五年规划纲要的指导思想
export function getStructure(params) {
  return request({
    url: '/programme/word/findStructure',
    method: 'get',
    params
  })
}