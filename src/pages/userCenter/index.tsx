import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import utils from '../../utils/index'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import './style.scss'
const Index = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '个人中心'
    })
  })
  return (
    <View>
      <AtAvatar circle image="https://jdc.jd.com/img/200" />
      <Button onClick={()=> utils.handleNavigateTo('/pages/users/index')}>用户登录</Button>
      {/* <AtList hasBorder={false}>
        <AtListItem
          hasBorder={false}
          title="用户登录"
          arrow="right"
          thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
        />
        <AtListItem
          isSwitch
          title="标题文字"
          hasBorder={false}
          onSwitchChange={this.handleChange}
        />
      </AtList> */}
    </View>
  )
}
export default Index
