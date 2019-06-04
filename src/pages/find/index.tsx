import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IconButtonWrapper from '../../conmponents/IconButtonWrapper'
import BannerImage from '../../conmponents/BannerImage'
import SearchBar from '../../conmponents/SearchBar/index'
import SongList from '../../conmponents/SongList/index'
import NewMuiscList from '../../conmponents/NewMusicList/index'
import './style.scss'
class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'myMusics'
  }
  render() {
    return (
      <View>
        <SearchBar focus={false}/>
        <BannerImage />
        <View className="find--wrapper">
          <IconButtonWrapper />
          <SongList />
          <NewMuiscList />
        </View>
      </View>
    )
  }
}

export default Index
