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

// 缓存get数据
function setStorageSync(name: string, data: object[]): void {
  let storageData = {
    cacheData: data,
    expired: Date.now() + 60 * 1000 * 60 * 24
  }
  wx.setStorageSync(name, storageData)
}

export default {
  handleNavigateTo,
  handleRedirectTo,
  handleLaunch,
  navigateBack: Taro.navigateBack,
  setStorageSync
}