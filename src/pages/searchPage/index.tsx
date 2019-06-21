import Taro, { useState, useEffect, useCallback } from '@tarojs/taro'
import { AtTag, AtToast, AtList, AtListItem } from 'taro-ui'
import SearchBar from '../../conmponents/SearchBar/index'
import { View, Text } from '@tarojs/components'
import utils from '../../utils/index'
import api from '../../utils/api'
import './style.css'
import { connect } from '@tarojs/redux'
interface IHostList {
  first: string
}
interface IErrorState {
  isOpened: boolean
  text: string
}

const Index = ({ songListInfos, dispatch }) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<IErrorState>({
    isOpened: false,
    text: ''
  })
  const [name, setName] = useState<string>('')
  const [hotsList, setHotsList] = useState<IHostList[]>([])
  const [songList, setSongList] = useState([])
  useEffect(() => {
    console.log(dispatch)
    Taro.setNavigationBarTitle({
      title: '搜索'
    })
    const fetchData = async () => {
      const { result } = await api.getHotSearch()
      if (result.hots.length >= 1) {
        setHotsList(result.hots)
        utils.setStorageSync('host_search', result.hots)
      }
    }
    const storageData = wx.getStorageSync('host_search')
    if (storageData && storageData.expired < Date.now()) {
      fetchData()
    } else {
      setHotsList(storageData.cacheData)
    }
  }, [])
  const handleChangeValue = useCallback(
    (value: string) => {
      setValue(value)
    },
    [value]
  )
  const hanldeClickSubmit = async () => {
    if (!value) {
      return setError({
        isOpened: true,
        text: '请输入正确的内容'
      })
    }
    await getSearchSubmit(value)
  }
  const getSearchSubmit = async (val) => {
    const { result } = await api.getSearch(val)
    if (result.songCount && result.songs.length >= 1) {
      setSongList(result.songs)
    } else {
      setError({
        isOpened: true,
        text: '搜索错误, 请稍后再试'
      })
    }
  }
  const handleTagClick = useCallback(
    (obj) => {
      setName(obj.name)
      getSearchSubmit(obj.name)
    },
    [name]
  )
  const handleSongClick = async ({
    singer,
    title,
    epname,
    id
  }: {
    singer: string
    title: string
    epname: string
    id: number
  }) => {
    const { success, message } = await api.checkSongUrl(id)
    if (success) {
      const { code, data } = await api.getSongUrl(id)
      const { songs } = await api.getSongDetail(id)
      // const {  lrc } = await api.getMusicLyrices(id)
      if (code === 200 && songs.length >= 1) {
        let coverImg = songs[0].al.picUrl
        let ident = utils.dedupArray(songListInfos, id)
        if (!ident) {
          dispatch({
            type: 'SET_SONGLIST',
            payload: {
              singer,
              title,
              epname,
              id,
              musicUrl: data[0].url,
              coverImg
            }
          })
        }
        utils.handleRedirectTo('/pages/musicPlay/index')
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
      <SearchBar
        focus={true}
        onChange={handleChangeValue}
        value={value}
        onClick={hanldeClickSubmit}
      />
      {songList.length < 1 ? (
        <View style={{ padding: '15px' }}>
          <Text style={{ fontSize: '16px', fontWeight: 600, marginBottom: '2px' }}>热门搜索</Text>
          <View className="search_wrapper">
            {hotsList.map((v) => (
              <View style={{ display: 'inline-block', margin: '2px 10px' }} key={v.first}>
                <AtTag
                  size="small"
                  onClick={handleTagClick}
                  name={v.first}
                  active={name === v.first ? true : false}
                >
                  {v.first}
                </AtTag>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <view>
          <AtList hasBorder={false}>
            {songList.map((v: any) => (
              <AtListItem
                key={v.id}
                title={v.name}
                note={v.artists[0].name + ' - ' + v.album.name}
                arrow="right"
                onClick={() =>
                  handleSongClick({
                    singer: v.artists[0].name,
                    title: v.name,
                    epname: v.album.name,
                    id: v.id
                  })
                }
              />
            ))}
          </AtList>
        </view>
      )}
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
