import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '推荐歌单'
  }
  render() {
    return (
      <View>推荐歌单页面</View>
    )
  }
}

export default Index
