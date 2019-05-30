import Taro from '@tarojs/taro'

function handleNavigateTo(url: string): void {
  Taro.navigateTo({ url })
}



export default {
  handleNavigateTo
}