import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import api from '../../utils/api'
import SearchBar from '../../conmponents/SearchBar/index'
import SongList from '../../conmponents/SongList/index'
import './style.scss'

const Index = () => {
  const [list, setList] = useState<Array<any>>([])
  useEffect(() => {
    api.getBanner().then(data => {
      const { banners } = data
      const newBanner = banners.splice(0, 4)
      setList(newBanner)
    })
  }, [])
  return (
    <View>
      <SearchBar />
      <Swiper
        className="find--banner"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        vertical={false}
        circular
        indicatorDots
        autoplay
      >
        {list.map((v, i) => (
          <SwiperItem key={i}>
            <Image
              style="width: 100%;height: 100%;background: #fff;"
              src={v.imageUrl}
            />
          </SwiperItem>
        ))}
      </Swiper>
      <View className="find-wrapper">
        <SongList />
      </View>
    </View>
  )
}

export default Index
