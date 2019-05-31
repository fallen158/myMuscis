import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '电台'
  }
  render() {
    return (
      <View>电台播放页面</View>
    )
  }
}

export default Index
