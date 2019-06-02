import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import configStore from './store'
import './utils/loading'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      // 'pages/index/index',
      'pages/userCenter/index',
      'pages/find/index',
      'pages/musics/index',
      'pages/radio/index',
      'pages/users/login/index',
      'pages/users/register/index',
      'pages/recommendDaily/index',
      'pages/songListDetails/index',
      'pages/newestMusic/index',
      'pages/newwestDish/index',
      'pages/songSquare/index',
      'pages/musicPlay/index',
      'pages/leaderboard/index'
    ],
    window: {
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'myMusics',
      backgroundColor: '#eeeeee',
      backgroundTextStyle: 'light',
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#d43c33',
      borderStyle: 'black',
      backgroundColor: '#fff',
      list: [
        {
          pagePath: 'pages/find/index',
          text: '发现',
          iconPath: 'assets/find.png',
          selectedIconPath: 'assets/find_active.png',
        },
        // {
        //   pagePath: 'pages/musics/index',
        //   text: '视频',
        //   iconPath: 'assets/video.png',
        //   selectedIconPath: 'assets/video_active.png',
        // },
        {
          pagePath: 'pages/musics/index',
          text: '我的',
          iconPath: 'assets/music.png',
          selectedIconPath: 'assets/music_active.png',
        },
        // {
        //   pagePath: 'pages/video/index',
        //   text: '朋友',
        //   iconPath: 'assets/friend.png',
        //   selectedIconPath: 'assets/friend_active.png',
        // },
        {
          pagePath: 'pages/userCenter/index',
          text: '账号',
          iconPath: 'assets/user.png',
          selectedIconPath: 'assets/user_active.png',
        },
      ],
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
