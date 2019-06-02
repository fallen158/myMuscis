import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import api from '../../utils/api'
import './styles.scss'

type IBannerState = {
  pic: string
}

const Index = () => {
  const [list, setList] = useState<Array<IBannerState>>([])
  useEffect(() => {
    api.getBanner().then((data) => {
      const { banners } = data
      const newBanner = banners.splice(0, 8)
      setList(newBanner)
    })
  }, [])
  return (
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
          <Image className="img" src={v.pic} />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default Index
