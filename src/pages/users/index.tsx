import Taro, { useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import utils from '../../utils/index'
const Index = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '账户登录'
    })
  })

  return (
    <View>
      <AtAvatar circle image="https://jdc.jd.com/img/200" />
      <View>刘先生</View>
      <View>欢迎回来</View>

      <Button type="primary">微信一键登录</Button>
      <AtButton onClick={() => utils.handleNavigateTo('/pages/users/login/index')}>
        手机号验证码登录
      </AtButton>
    </View>
  )
}

export default Index
