import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'

const Index = (props) => {
  const [value, setValue] = useState('')
  const audioCtx = wx.createAudioContext('myAudio')
  const videoContext = wx.createVideoContext('myVideo')
  audioCtx.setSrc(
    'http://m10.music.126.net/20190530172711/b00b744e4c816d02c16f37fc47f996a6/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
  )
  useEffect(() => {
    // console.log(audioInfo)
    console.log(audioCtx)
  }, [])

  const handleBarrageValue = (e) => {
    setValue(e.target.value)
  }

  function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }

  const handleSendDanmu = () => {
    videoContext.sendDanmu({
      text: value,
      color: getRandomColor()
    })
  }
  return (
    <View>
      测试 Music 视频 播放
      <audio src="{{src}}" id="myAudio" />
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
      <video
        id="myVideo"
        src="http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/bf2750483ed02d4c6263dffefa5959d7.mp4?wsSecret=10a1d56fad74767d98b97ec33bfbd92d&wsTime=1559207636"
        enable-danmu
        danmu-btn
        controls
      />
      <View>
        <Input value={value} type="text" onInput={handleBarrageValue} />
        <Button onClick={handleSendDanmu}>发送弹幕</Button>
      </View>
    </View>
  )
}


export default Index
