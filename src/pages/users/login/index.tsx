import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '登录'
  }
  render() {
    return (
      <View>登录页面</View>
    )
  }
}

export default Index
