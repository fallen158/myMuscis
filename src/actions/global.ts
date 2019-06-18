import { LOGIN, LOGOUT } from '../constants/global'

export function logout() {
  return { type: LOGOUT }
}

export function login(data) {
  return { type: LOGIN, payload: data }
}