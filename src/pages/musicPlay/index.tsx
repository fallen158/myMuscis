import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import api from '../../utils/api'
import { AtList, AtListItem } from 'taro-ui'
import './style.scss'

class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'login'
  }
  state = {
    recommends: []
  }
  componentWillMount() {
    console.log(1)
  }
  handleLogin = () => {
    let obj = {
      phone: 13717022872,
      password: 'lf13717022872.'
    }
    api.login(obj).then((data) => {
      console.log(data)
      wx.setStorageSync('token', data['cookies'])
    })
  }
  handleDateRecommend = () => {
    const headers = {
      'content-type': 'application/json',
      withCredentials: true,
      cookie: wx.getStorageSync('token').toString()
    }
    console.log(headers)
    api.getDateRecommend(headers).then(async (data) => {
      await this.setState({
        recommends: data.recommend
      })
    })
  }
  render() {
    return (
      <View>
        {/* <View>登录获取每日推荐歌曲，跳转歌曲播放页面</View>
        <Button onClick={this.handleLogin}>Login</Button>
        <Button onClick={this.handleDateRecommend}>获取每日推荐歌曲</Button>
        <AtList>
          {this.state.recommends.map((v) => (
            <AtListItem
              key={v.id}
              title={v.name}
              note={v.album.artists[0].name + ' - ' + v.album.name}
              extraText='详细信息'
              arrow='right'
              thumb={v.album.picUrl}
            />
          ))}
        </AtList> */}
        {/* <View>播放页面</View> */}
        <View className='user--container'>
          <View className='m-song-wrap'>
            <View className='m-song-disc' />
            <View className='m-song-clickarea' />
          </View>
        </View>
      </View>
    )
  }
}

export default Index