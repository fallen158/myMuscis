import { LOGIN, LOGOUT, PLAY_MUSIC, STOP_MUSIC, SET_SONGLIST } from '../constants/global'

interface ISongList {
  id: number
  url: string
  author: string
  name: string
  coverImg: string
}

type IInitState = {
  userInfo: [],
  play: boolean
  songListInfos: ISongList[]
}

const INITIAL_STATE: IInitState = {
  userInfo: [],
  play: false,
  songListInfos: []
}

export default function global(state = INITIAL_STATE, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return {
        ...state,
        userInfo: payload
      }
    case LOGOUT: {
      return {
        ...state,
        userInfo: []
      }
    }
    case PLAY_MUSIC:
      return {
        ...state,
        play: true
      }
    case STOP_MUSIC:
      return {
        ...state,
        play: false
      }
    case SET_SONGLIST:
      const newSongList = [...state.songListInfos]
      newSongList.unshift(payload)
      return {
        ...state,
        songListInfos:newSongList
      }
    default:
      return state
  }
}
