import Taro, { useState, useEffect } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import api from '../../utils/api'

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
    <div>
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
    </div>
  )
}

export default Index
