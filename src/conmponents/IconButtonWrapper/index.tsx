import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './style.scss'
import utils from '../../utils/index'

interface IIconState {
  icon: string
  name: string
  id: number
  link: string
}

const iconList: Array<IIconState> = [
  {
    icon: 'rili',
    name: '每日推荐',
    id: 0,
    link: '/pages/recommendDaily/index'
  },
  {
    icon: 'gedan',
    name: '歌单',
    id: 1,
    link: '/pages/songSquare/index'
  },
  {
    icon: 'paihangbang',
    name: '排行榜',
    id: 2,
    link: '/pages/leaderboard/index'
  },
  {
    icon: 'yule',
    name: '电台',
    id: 3,
    link: '/pages/radio/index'
  },
  {
    icon: 'FM',
    name: '私人FM',
    id: 4,
    link: '/pages/musicPlay/index'
  }
]

const Index = () => {
  return (
    <View className="container">
      {iconList.map((v, i) => (
        <View key={v.id} className="item">
          <Button className="myButton" onClick={() => utils.handleNavigateTo(v.link)}>
            <AtIcon prefixClass="icon" value={v.icon} size="25" color="#fff" />
          </Button>
          <Text>{v.name}</Text>
        </View>
      ))}
    </View>
  )
}

export default Index
