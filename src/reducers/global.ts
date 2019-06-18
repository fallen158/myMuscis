import { LOGIN, LOGOUT } from '../constants/global'

type IInitState = {
  userInfo: [],
  play: boolean
}

const INITIAL_STATE: IInitState = {
  userInfo: [],
  play: false
}

export default function global(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userInfo: action.payload
      }
    case LOGOUT: {
      return {
        ...state,
        userInfo: []
      }
    }
    default:
      return state
  }
}
