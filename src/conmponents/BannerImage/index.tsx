import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import api from '../../utils/api'
import './styles.scss'

type IBannerState = {
  pic: string
}

const Index = () => {
  const [data, setData] =  useState<Array<IBannerState>>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getBanner()
      setData(result.banners)
    }
    fetchData()
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
      {data.map((v, i) => (
        <SwiperItem key={i}>
          <Image className="img" src={v.pic} />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default Index
