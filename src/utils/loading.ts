// 全局请求拦截
import Taro from '@tarojs/taro'

const interceptor = async (chain) => {
    const requestParams = chain.requestParams
    const { method, data, url } = requestParams
    console.log(`http ${method || 'GET'} --> ${url} data: `, data)
    Taro.showLoading({
        title: 'loading'
    })
    let res = await chain.proceed(requestParams)
    console.log(`http <-- ${url} result:`, res)
    Taro.hideLoading()
    return res

}

Taro.addInterceptor(interceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)