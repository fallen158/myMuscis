import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '新碟上架'
  }
  render() {
    return (
      <View>新碟上架</View>
    )
  }
}

export default Index
