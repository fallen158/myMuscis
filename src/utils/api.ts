import request from './request'
const HOST_URL = 'http://localhost:3000/'

// 获取 banner 轮播图
function getBanner() {
  return request({ url: `${HOST_URL}banner` })
}


export default {
  getBanner
}