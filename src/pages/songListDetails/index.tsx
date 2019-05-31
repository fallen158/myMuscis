import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '歌单介绍'
  }
  render() {
    return (
      <View>歌单介绍页面</View>
    )
  }
}

export default Index
