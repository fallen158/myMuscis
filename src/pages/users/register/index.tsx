import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '注册'
  }
  render() {
    return (
      <View>注册页面</View>
    )
  }
}

export default Index
