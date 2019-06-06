import { LOGIN, LOGOUT } from '../constants/users'

export function logout() {
  return { type: LOGOUT }
}

export function login(data) {
  return { type: LOGIN, payload: data }
}