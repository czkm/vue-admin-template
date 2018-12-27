/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
// const BASE_URL = 'http://local:4000'
const BASE_URL = 'https://www.easy-mock.com/mock/5c0c79f91b4f006bfb76b9b5/example'

/**
 * 获取 公告板信息
 */
export const reqMessage = () => ajax(`${BASE_URL}/getmessagepanel`)
/**
 * 获取 订单管理详情
 */
export const reqOrderManage = () => ajax(`${BASE_URL}/OrderManage`, {}, 'POST')
/**
 * 测试
 */
// export const reqTest = () => ajax(`${BASE_URL}/OrderManage`, {}, 'POST')
