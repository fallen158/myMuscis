import Taro from '@tarojs/taro'

function handleNavigateTo(url: string): void {
  Taro.navigateTo({ url })
}

function handleRedirectTo(url: string): void {
  Taro.redirectTo({ url })
}
function handleLaunch(url: string): void {
  Taro.reLaunch({ url })
}

// 缓存请求数据
function setStorageSync(name: string, data: object[]): void {
  let storageData = {
    cacheData: data,
    expired: Date.now() + 60 * 1000 * 60 * 24
  }
  wx.setStorageSync(name, storageData)
}

// 解析歌词
function parseLyric(lyric: string) {
  let lines = lyric.split('\n')
  let result: any = []
  lines[lines.length - 1].length === 0 && lines.pop()
  for (let data of lines) {
    let index = data.indexOf(']')
    let time = data.substring(0, index + 1)
    let value = data.substring(index + 1)
    let timeString = time.substring(1, time.length - 2)
    let timeArr = timeString.split(':')
    result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value])
  }
  result.sort(function (a, b) {
    return a[0] - b[0]
  })
  return result
}

// 去重判断
function dedupArray(arr: [{ id: number }], id) {
  let y = false
  arr.map((v) => {
    if (v.id === id) {
      y = true
    }
  })
  return y
}

export default {
  handleNavigateTo,
  handleRedirectTo,
  handleLaunch,
  navigateBack: Taro.navigateBack,
  setStorageSync,
  parseLyric,
  dedupArray
}