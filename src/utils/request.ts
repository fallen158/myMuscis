import Taro from '@tarojs/taro'

function checkStatus(response: any) {
  if (response.statusCode >= 200 && response.statusCode <= 300) {
    return response
  }
  const error: any = new Error(response.errMsg)
  error.response = response
  return error

}

export default async function request({ url = '', header = { 'content-type': 'application/json' } } = {}) {
  const response = await Taro.request({ url, header })
  checkStatus(response)
  const data = await response.data
  return data

}