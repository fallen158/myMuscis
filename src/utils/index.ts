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


export default {
  handleNavigateTo,
  handleRedirectTo,
  handleLaunch,
  navigateBack: Taro.navigateBack
}