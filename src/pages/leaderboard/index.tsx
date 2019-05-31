import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '排行榜'
  }
  render() {
    return (
      <View>排行榜</View>
    )
  }
}

export default Index
