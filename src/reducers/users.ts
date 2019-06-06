import { LOGIN, LOGOUT } from '../constants/users'

type IInitState = {
  userInfo: []
}

const INITIAL_STATE: IInitState = {
  userInfo: []
}

export default function users(state = INITIAL_STATE, action) {
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
