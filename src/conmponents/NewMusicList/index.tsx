import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import api from '../../utils/api'
import utils from '../../utils/index'
import './styles.scss'

interface IDishListData {
  id: number
  picUrl: string
  name: string
  playCount: number
  artists: Array<{ name: string }>
}
const Index = () => {
  const [songList, setSongList] = useState<[]>([])
  const [dishList, setDishList] = useState<[]>([])
  const [checked, setChecked] = useState<Boolean>(true)
  useEffect(() => {
    api.getNewDish().then((data) => {
      const newDishList = data.albums.splice(0, 3)
      setDishList(newDishList)
    })

    api.getNewMusics().then((data) => {
      const newSongList = data.result.splice(-3, 5)
      setSongList(newSongList)
    })
  }, [])
  const handleChecked = () => {
    setChecked(!checked)
  }
  return (
    <View>
      <View className="at-row at-row__justify--between  at-row__align--center songlist--title">
        <View className="at-col at-col-5">
          <Text
            onClick={handleChecked}
            className={checked ? '.songlist--title__text--active' : undefined}
          >
            新碟{' '}
          </Text>
          <Text
            onClick={handleChecked}
            className={checked ? undefined : '.songlist--title__text--active'}
          >
            | 新歌
          </Text>
        </View>
        <View className="at-col at-col-5" style={{ textAlign: 'right' }}>
          {checked ? (
            <AtButton
              circle
              size="small"
              onClick={() => utils.handleNavigateTo('/pages/newwestDish/index')}
            >
              更多新碟
            </AtButton>
          ) : (
            <AtButton
              circle
              size="small"
              onClick={() => utils.handleNavigateTo('/pages/newestMusic/index')}
            >
              新歌推荐
            </AtButton>
          )}
        </View>
      </View>
      {checked ? (
        <View className="songlist--items">
          {dishList
            ? dishList.map((v: IDishListData) => (
                <View key={v.id} className="songlist--item">
                  <Image src={v.picUrl} className="img" />
                  <Text>{v.name}</Text>
                  <View>{v.artists[0].name}</View>
                </View>
              ))
            : null}
        </View>
      ) : (
        <View className="songlist--items">
          {songList
            ? songList.map((v: any) => (
                <View key={v.id} className="songlist--item">
                  <Image src={v.song.album.picUrl} className="img" />
                  <Text>{v.name}</Text>
                  <View>{v.song.album.artists[0].name}</View>
                </View>
              ))
            : null}
        </View>
      )}
    </View>
  )
}

export default Index
