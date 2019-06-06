import Taro, { useState, useEffect } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import utils from '../../utils/index'
import api from '../../utils/api'
import './styles.scss'

const Index = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '搜索'
    })
  })
  return (
    <View>
      <View className="user--container">
        <View className="m-song-wrap">
          <View className="m-song-disc">
            <Image className="img" src='http://p1.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0' />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
