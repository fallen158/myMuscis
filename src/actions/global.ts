import { LOGIN, LOGOUT, PLAY_MUSIC, STOP_MUSIC, SET_SONGLIST } from '../constants/global'

export function logout() {
  return { type: LOGOUT }
}

export function login(data) {
  return { type: LOGIN, payload: data }
}

export function playMuisc() {
  return { type: PLAY_MUSIC }
}

export function stopMusic() {
  return { type: STOP_MUSIC }
}

export function setSongList() {
  return { type: SET_SONGLIST }
}