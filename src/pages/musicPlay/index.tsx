import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import utils from '../../utils/index'
import api from '../../utils/api'
import './styles.scss'
import { string } from 'prop-types'

const audioCtx = wx.createInnerAudioContext()
audioCtx.onPlay(() => {
  console.log('开始播放')
})
audioCtx.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

const Index = ({ dispatch, play, songListInfos }) => {
  const [lyircs, setLyircs] = useState<string>('')
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '音乐播放'
    })
    audioCtx.src = songListInfos[0].url
    wx.setStorageSync('SONGLIST', songListInfos)
    dispatch({ type: 'PLAY_MUSIC' })
    audioCtx.play()

    const fetchLyircs = async () => {
      const { code, lrc } = await api.getMusicLyrices(songListInfos[0].id)
      if (code === 200) {
        setLyircs(lrc)
        console.log(lrc)
      }
      console.log(lyircs,'--------')
    }
    fetchLyircs()
  }, [])
  const playMusic = () => {
    console.log('播放音乐')
    dispatch({ type: 'PLAY_MUSIC' })
    audioCtx.play()
  }
  const stopMusic = () => {
    console.log('暂停音乐')
    dispatch({ type: 'STOP_MUSIC' })
    audioCtx.pause()
  }
  return (
    <View>
      <View className="user--container">
        {/* <audio src="{{src}}" id="myAudio" /> */}
        {/* <View className="m-song-bg">
          <Image className="m-song-img" src='https://p3.music.126.net/WvHzvmnTR9h-uWPA8lINJA==/109951164107566472.jpg' />
        </View> */}
        {/* <Button type="primary" onClick={() => audioCtx.play()}>
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
        </Button> */}

        <View className="m-song-wrap">
          <View className={play ? 'm-song-disc play' : 'm-song-disc'}>
            <Image className="img" src={songListInfos[0].coverImg} />
          </View>
          <View className="m-song-media">
            <View className="m-song-control">
              <View className="at-icon at-icon-shuffle-play" />
              <View className="at-icon at-icon-prev" />
              {play ? (
                <View className="at-icon at-icon-pause m-song-play" onClick={stopMusic} />
              ) : (
                <View className="at-icon at-icon-play m-song-play" onClick={playMusic} />
              )}
              <View className="at-icon at-icon-next" />
              <View className="at-icon at-icon-playlist" />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

function mapPropsToState(state) {
  const { play, songListInfos } = state.global
  return {
    play,
    songListInfos
  }
}

export default connect(mapPropsToState)(Index)
