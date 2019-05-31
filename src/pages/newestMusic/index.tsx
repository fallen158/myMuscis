import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '最新音乐'
  }
  render() {
    return (
      <View>最新音乐</View>
    )
  }
}

export default Index
