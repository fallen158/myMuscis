import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import api from '../../utils/api'
import './styles.scss'
import utils from '../../utils/index'

type IBannerState = {
  pic: string
}

const Index = () => {
  const [data, setData] = useState<Array<IBannerState>>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getBanner()
      if (result.code === 200) {
        setData(result.banners)
        utils.setStorageSync('music_banners', result.banners)
      }
    }

    const storageData = wx.getStorageSync('music_banners')
    if (storageData && storageData.expired < Date.now()) {
      fetchData()
    } else {
      setData(storageData.cacheData)
    }
  }, [])
  const handleClick = () => {
    // 不用Redux传递数据，用localStorage
  }
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
        <SwiperItem
          key={i}
          // onClick={() =>
          //   handleClick({
          //     singer: v.artists[0].name,
          //     title: v.name,
          //     epname: v.album.name,
          //     id: v.id
          //   })
          // }
        >
          <Image className="img" src={v.pic} />
        </SwiperItem>
      ))}
    </Swiper>
  )
}

export default Index
