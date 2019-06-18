import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import utils from '../../utils/index'
import api from '../../utils/api'
import './styles.scss'

const Index = () => {
  const audioCtx = wx.createAudioContext('myAudio')
  audioCtx.setSrc(
    'http://m10.music.126.net/20190618172634/42fe2fc6c9cb41d783b50f439bffbf41/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
  )
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '音乐播放'
    })
    console.log(audioCtx)
  })
  return (
    <View>
      <View className="user--container">
        {/* <View className="m-song-bg">
          <Image className="m-song-img" src='https://p3.music.126.net/WvHzvmnTR9h-uWPA8lINJA==/109951164107566472.jpg' />
        </View> */}
        <Button type="primary" onClick={() => audioCtx.play()}>
          播放
        </Button>
        <Button type="primary" onClick={() => audioCtx.pause()}>
          暂停
        </Button>
        <Button type="primary" onClick={() => audioCtx.seek(14)}>
          设置当前播放时间为14秒
        </Button>
        <Button type="primary" onClick={() => audioCtx.seek(0)}>
          回到开头
        </Button>

        <View className="m-song-wrap">
          <View className="m-song-disc">
            <Image
              className="img"
              src="http://p1.music.126.net/qXoj3GTwWWtDDETq72oovQ==/109951164107576105.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0"
            />
            <Image
              className="play_img"
              src="../../assets/pyay.png"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Index
