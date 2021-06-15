import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000 // 超时时间
})

// response 拦截器
service.interceptors.response.use(
  res => {
    if (res.status !== 200) {
      Toast({
        type: 'fail',
        duration: 2 * 1000,
        message: res.data.msg || '请求失败'
      })
      return Promise.reject(new Error(res.data.msg || '请求失败'))
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
service.interceptors.request.use(config => {
  // 配置请求头中的token
  const token = getItem('token')
  if (token) {
    // 注意：该接口需要授权才能访问；token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么(请求还没有发出)
  return Promise.reject(error)
})
export default service
