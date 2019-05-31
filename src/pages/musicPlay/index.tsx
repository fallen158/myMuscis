import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '音乐播放页面'
  }
  render() {
    return (
      <View>音乐播放页面</View>
    )
  }
}

export default Index
