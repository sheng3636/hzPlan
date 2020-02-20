import request from '@/utils/request'
// 获取文档上传下拉框数据
export function getDocuInfo() {
  return request({
    url: '/programme/word/findByBusesice',
    method: 'get'
  })
}
export function getAddress() {
  return request({
    url: '/programme/word/queryAddress',
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
// 删除摘要
export function delEcollect(data) {
  return request({
    url: '/programme/word/delete_Collection',
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
// 获取用户的收藏数据
export function getEcollect(params) {
  return request({
    url: '/programme/word/queryCollection',
    method: 'get',
    params
  })
}
// 获取报告参考文档类型数量
export function getReportCounts(params) {
  return request({
    url: '/programme/word/query_report',
    method: 'get',
    params
  })
}
// 获取报告参考各市县区文档类型数量图表
export function getGraphReportCounts(params) {
  return request({
    url: '/programme/word/query_graph',
    method: 'get',
    params
  })
}
// 获取某市县区上位指导文档数量
export function getGuideCounts(params) {
  return request({
    url: '/programme/word/query_document',
    method: 'get',
    params
  })
}
// 获取某市县区上位指导文档
export function getGuideDocu(params) {
  return request({
    url: '/programme/word/querydocument',
    method: 'get',
    params
  })
}
// 上位指导--查询文档内容
export function getGuideDocuAreaContent(params) {
  return request({
    url: '/programme/word/selectNan',
    method: 'get',
    params
  })
}
