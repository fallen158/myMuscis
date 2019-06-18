import request from './request'

const HOST_URL = 'http://129.204.110.185:3000'

// 获取 banner 轮播图
function getBanner() {
  return request({ url: `${HOST_URL}/banner?type=2` })
}

// 获取推荐歌单
function getRecommendtSongList() {
  return request({ url: `${HOST_URL}/personalized` })
}

// 获取推荐新歌
function getNewMusics() {
  return request({ url: `${HOST_URL}/personalized/newsong` })
}

// 获取推荐新碟
function getNewDish() {
  return request({ url: `${HOST_URL}/album/newest` })
}

// 获取每日推荐
type ILoginOptions = {
  'content-type': string
  withCredentials: boolean
  cookie: string
}
function getDateRecommend(options: ILoginOptions) {
  return request({ url: `${HOST_URL}/recommend/songs`, header: options })
}

// 搜索
function getSearch(keywords: string) {
  return request({ url: `${HOST_URL}/search?keywords=${keywords}` })
}

// 关键词搜索(传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息)
function getSearchKeyword(keywords: string) {
  return request({ url: `${HOST_URL}/search/suggest?keywords=${keywords}&type=mobile` })
}

// 热搜
function getHotSearch(){
  return request({url:`${HOST_URL}/search/hot`})
}

// 获取排行榜
/**
 *
 * "1": 云音乐热歌榜,
 * "8": iTunes榜,
 * "10": 日本Oricon周榜,
 * "14": 中国TOP排行榜(港台榜),,
 * "6": 美国Billboard周榜,
 * "4": 云音乐电音榜,
 */
function getLeaderboard(id) {
  return request({ url: `${HOST_URL}/top/list?idx=${id}` })
}

// 获取评论
/**
 * 必选参数 : id: 音乐 id
 * 可选参数 : limit: 取出评论数量 , 默认为 20
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
function getMusicComment({ id, limit }) {
  return request({ url: `${HOST_URL}/comment/music?id=${id}&limit=${limit} ` })
}

// 获取歌词
/**
 * 必选参数 : id: 音乐 id
 */
function getMusicLyrices(id) {
  return request({ url: `${HOST_URL}/lyric?id=${id}` })
}

// 手机登录
function login(phone, password) {
  return request({ url: `${HOST_URL}/login/cellphone?phone=${phone}&password=${password}` })
}

// 获取验证码
function getPhoneCode(phone) {
  return request({ url: `${HOST_URL}/captch/sent?phone=${phone}` })
}
// 手机验证码登录
function loginPhone(phone, code) {
  return request({ url: `${HOST_URL}/captch/verify?phone=${phone}&captcha=${code}` })
}

// 注册
function register({ phone, password, captcha, nickname }) {
  return request({
    url: `${HOST_URL}/captch/register?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`
  })
}

// 退出登录
function logout() {
  return request({ url: `${HOST_URL}/logout` })
}

export default {
  getBanner,
  getRecommendtSongList,
  getDateRecommend,
  getLeaderboard,
  getNewMusics,
  getMusicLyrices,
  getMusicComment,
  getNewDish,
  getSearch,
  getHotSearch,
  getSearchKeyword,
  getPhoneCode,
  loginPhone,
  login,
  register,
  logout
}
