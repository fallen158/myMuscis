import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import api from '../../utils/api'
import utils from '../../utils/index'
import './styles.scss'

interface ISongListData {
  id: number
  picUrl: string
  name: string
  playCount: number
}

const Index = () => {
  const [songList, setSongList] = useState<[]>([])
  useEffect(() => {
    api.getRecommendtSongList().then((data) => {
      const newData = data.result.splice(0, 6)
      setSongList(newData)
    })
  }, [])
  return (
    <View>
      <View className="at-row at-row__justify--between  at-row__align--center songlist-title">
        <View className="at-col at-col-5" style={{fontWeight: 700}}>推荐歌单</View>
        <View className="at-col at-col-5" style={{ textAlign: 'right' }}>
          <AtButton
            circle
            size="small"
            onClick={() => utils.handleNavigateTo('/pages/songSquare/index')}
          >
            歌单广场
          </AtButton>
        </View>
      </View>
      <View className="songlist--items">
        {songList
          ? songList.map((v: ISongListData) => (
              <View key={v.id} className="songlist--item">
                <Image src={v.picUrl} className="img" />
                <Text>{v.name}</Text>
              </View>
            ))
          : null}
      </View>
    </View>
  )
}

export default Index
