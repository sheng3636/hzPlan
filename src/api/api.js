import {
  fetch,
  post
}
from '@/config/axios'
/**
 * 获取词云数据
 */
export const getCiYun = (json) => fetch('https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328/hzPlan/wordCould', {})
/**
 * 获取各市文档报告类型数据
 */
export const getDocumentsType = (json) => fetch('https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328/hzPlan/documentsType', {})
/**
 * 收藏请求状态
 */
export const collectStatus = (json) => fetch('https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328/hzPlan/collectStatus', {})
/**
 * 保存摘要
 */
export const saveSummaryInfo = (json) => fetch('https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328/hzPlan/saveSummaryInfo', {})
/**
 * 获取获取浙江省各市五年规划指导思想
 */
export const getGuidingThought = (json) => post('https://www.fastmock.site/mock/1f3a07523606cd78e586a1780f46c328/hzPlan/guidingThought', {})
/**
 * 获取文档上传下拉框数据
 */
export const getDocuInfo = (json) => fetch('/imp/programme/word/findByBusesice', {})
/**
 * 提交上传文档
 */
export const uploadDocu = (json) => post('http://192.168.0.117:8083/programme/word/saveStructure', json)
/**
 * 保存摘要
 */
export const saveContent = (json) => post('http://192.168.0.117:8083/programme/word/save_content', json)