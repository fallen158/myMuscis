import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import utils from '../../utils/index'
import api from '../../utils/api'
import './styles.scss'

const backgroundAudioManager = wx.getBackgroundAudioManager()
backgroundAudioManager.onTimeUpdate(() => {
  console.log('当前播放时间位置', backgroundAudioManager.currentTime)
})
interface IProps {
  play: boolean
  songListInfos: Array<{
    title: string
    coverImg: string
    epname: string
    id: number
    singer: string
    musicUrl: string
  }>
  dispatch: (params: { type: string; payload?: any }) => {}
}

const Index: React.FC<IProps> = ({ dispatch, play, songListInfos }: IProps) => {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [lyric, setLyric] = useState([])
  const [isOpend, setIsOpend] = useState<boolean>(true)
  const { title, coverImg, epname, singer, musicUrl, id } = songListInfos[0] || {
    title: '',
    coverImg: '',
    epname: '',
    id: 1,
    singer: '',
    musicUrl: ''
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: `${singer} — ${title}`
    })
    backgroundAudioManager.title = title
    backgroundAudioManager.epname = epname
    backgroundAudioManager.singer = `${singer} — `
    backgroundAudioManager.coverImgUrl = coverImg
    // 设置src就会自动播放
    backgroundAudioManager.src = musicUrl
    let SONGLIST = wx.getStorageSync('SONGLIST')
    if (SONGLIST) {
      let ident = utils.dedupArray(SONGLIST, id)
      if (!ident) {
        SONGLIST.push({ title, coverImg, epname, singer, musicUrl, id })
        wx.setStorageSync('SONGLIST', SONGLIST)
      }
    }else{
      wx.setStorageSync('SONGLIST', songListInfos)
    }
    const fetchLyric = async () => {
      const { lrc, code } = await api.getMusicLyrices(id)
      if (code === 200 && lrc) {
        setLyric(utils.parseLyric(lrc.lyric))
      }
    }
    fetchLyric()
  }, [])

  useEffect(() => {
    backgroundAudioManager.onTimeUpdate(() => {
      setCurrentTime(backgroundAudioManager.currentTime)
      // 记录高亮歌词位置
      lyric.map((v, i) => {
        if (Number(currentTime) > v[0] - 1) {
          setCurrentIndex(i)
        }
      })
    })
  }, [currentTime])

  const playMusic = () => {
    console.log('播放音乐')
    dispatch({ type: 'PLAY_MUSIC' })
    backgroundAudioManager.play()
  }
  const stopMusic = () => {
    console.log('暂停音乐')
    dispatch({ type: 'STOP_MUSIC' })
    backgroundAudioManager.pause()
  }
  return (
    <View>
      <View className="user--container">
        <View className="m-song-title" />
        <View className="m-song-wrap" onClick={() => setIsOpend(!isOpend)}>
          {isOpend ? (
            <View className={play ? 'm-song-disc play' : 'm-song-disc'}>
              <Image className="img" src={coverImg} />
            </View>
          ) : (
            <View
              style={{
                zIndex: 999,
                color: 'gray',
                textAlign: 'center',
                overflow: 'auto',
                width: '100%',
                fontSize: '16px'
              }}
            >
              <view />
              {lyric && lyric.length > 1 ? (
                lyric.map((v, i) => (
                  <View
                    key={v[0]}
                    style={
                      i === currentIndex
                        ? { color: '#fff', margin: '8px 0' }
                        : { margin: '8px 0', color: '#8e9ba1' }
                    }
                  >
                    {v[1]}
                  </View>
                ))
              ) : (
                <View>当前歌曲没有歌词</View>
              )}
            </View>
          )}
        </View>
        <View className="m-song-media">
          <View className="m-song-control">
            <View className="at-icon at-icon-reload" />
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
