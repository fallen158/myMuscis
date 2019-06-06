import Taro, { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import api from '../../utils/api'

interface IRecommends {
  id: number
  name: string
  album: any
}

const Index = () => {
  const [data, setData] = useState<Array<IRecommends>>([])
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '每日推荐'
    })
    const fetchData = async () => {
      let token = wx.getStorageSync('token').toString()
      const header = { 'content-type': 'application/json', withCredentials: true, cookie: token }
      const data = await api.getDateRecommend(header)
      if (data.code === 200) {
        setData(data.recommend)
      }
    }
    fetchData()
  }, [])
  return (
    <View>
      <AtList hasBorder={false}>
        {data.map((v) => (
          <AtListItem
          hasBorder={false}
            key={v.id}
            title={v.name}
            note={v.album.artists[0].name + ' - ' + v.album.name}
            extraText="详细信息"
            arrow="right"
            thumb={v.album.picUrl}
          />
        ))}
      </AtList>
    </View>
  )
}

export default Index
