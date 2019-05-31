import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '每日推荐'
  }
  render() {
    return (
      <View>每日推荐页面</View>
    )
  }
}

export default Index
