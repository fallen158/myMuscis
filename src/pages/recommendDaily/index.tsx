import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList,AtToast, AtListItem } from 'taro-ui'
import api from '../../utils/api'
import utils from '../../utils/index'
import { connect } from '@tarojs/redux'

interface IRecommends {
  id: number
  name: string
  album: any
}

interface IErrorState {
  isOpened: boolean
  text: string
}

const Index = ({ songListInfos, dispatch }) => {
  const [data, setData] = useState<Array<IRecommends>>([])
  const [error, setError] = useState<IErrorState>({
    isOpened: false,
    text: ''
  })
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '每日推荐'
    })
    const fetchData = async () => {
      const token = wx.getStorageSync('token').toString()
      const header = { 'content-type': 'application/json', withCredentials: true, cookie: token }
      const data = await api.getDateRecommend(header)
      if (data.code === 200) {
        setData(data.recommend)
        utils.setStorageSync('recommendDaily_data', data.recommend)
      }
    }
    const storageData = wx.getStorageSync('recommendDaily_data')
    if (!storageData ||  storageData.exired > Date.now()) {
      fetchData()
    } else {
      setData(storageData.cacheData)
    }
  }, [])
  const handleSongClick = async ({ author, name, id ,coverImg}) => {
    const { success, message } = await api.checkSongUrl(id)
    if (success) {
      const { code, data } = await api.getSongUrl(id)
      if (code === 200 ) {
        let ident = false
        songListInfos.map((v) => {
          if (v.id === id) {
            ident = true
          }
        })
        if (!ident) {
          dispatch({
            type: 'SET_SONGLIST',
            payload: {
              author,
              name,
              id,
              url: data[0].url,
              coverImg
            }
          })
          utils.handleRedirectTo('/pages/musicPlay/index')
        }
      }
    } else {
      setError({
        isOpened: true,
        text: message
      })
    }
  }
  return (
    <View>
      <AtList hasBorder={false}>
        {data
          ? data.map((v) => (
              <AtListItem
                hasBorder={false}
                key={v.id}
                title={v.name}
                note={v.album.artists[0].name + ' - ' + v.album.name}
                extraText="详细信息"
                arrow="right"
                thumb={v.album.picUrl}
                onClick={() =>
                  handleSongClick({
                    author: v.name,
                    name: v.album.artists[0].name + ' - ' + v.album.name,
                    id: v.id,
                    coverImg:v.album.picUrl
                  })
                }
              />
            ))
          : null}
      </AtList>
      <AtToast isOpened={error.isOpened} text={error.text} status="error" />
    </View>
  )
}

function mapPropsToState(state) {
  const { songListInfos } = state.global
  return {
    songListInfos
  }
}
export default connect(mapPropsToState)(Index)
