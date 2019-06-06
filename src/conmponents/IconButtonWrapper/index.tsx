import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtIcon, AtModal } from 'taro-ui'
import './style.scss'
import utils from '../../utils/index'

interface IIconState {
  icon: string
  name: string
  id: number
  link: string
}

interface IState {
  isOpend: boolean
  text: string
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
  const [propmt, setPropmt] = useState<IState>({
    isOpend: false,
    text: ''
  })
  const handleClick = (link: string, name: string) => {
    let token = wx.getStorageSync('token')
    if (name === '每日推荐' || name === '私人FM') {
      if (!token) {
        return setPropmt({ ...propmt, isOpend: true, text: '请先登录' }) 
      }
      utils.handleNavigateTo(link)
    } else {
      utils.handleNavigateTo(link)
    }
  }
  const handleConfirm = () => {
    setPropmt({ ...propmt, isOpend: false })
  }
  return (
    <View className="container">
      {iconList.map((v) => (
        <View key={v.id} className="item">
          <Button className="myButton" onClick={() => handleClick(v.link, v.name)}>
            <AtIcon prefixClass="icon" value={v.icon} size="25" color="#fff" />
          </Button>
          <Text>{v.name}</Text>
        </View>
      ))}
      <AtModal
        isOpened={propmt.isOpend}
        confirmText="确认"
        onConfirm={handleConfirm}
        content={propmt.text}
      />
    </View>
  )
}

export default Index
