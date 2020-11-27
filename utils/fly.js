const fly = new require('../lib/flyio')()
const host = () => {
  if (__wxConfig && __wxConfig.envVersion) {
    switch (__wxConfig.envVersion) {
      case 'develop':
        return 'https://api.dev3.loookauto.com'
      case 'trial':
        return 'https://api.test.loookauto.com'
    }
  }
  return 'https://api.loookauto.com'
}

fly.interceptors.request.use((request, promise) => {
  const token = wx.getStorageSync('accessToken')
  if (request.token != false && !token) {
    return promise.resolve(null)
  } else {
    request.headers = {
      'X-Tag': 'flyio',
      'content-type': 'application/json',
      'access_token': wx.getStorageSync('accessToken')
    }
  }
})

fly.interceptors.response.use(
  (response) => {
    const { status } = response
    switch (status) {
      case 200:
        const { code, data, message } = response.data
        switch (parseInt(code)) {
          case 200:
            if (message) wx.$showToast(message)
            return data || code
          case 401:
            wx.$showToast('请登录')
            wx.$store.logout()
            return null
          default:
            return null
        }
      default:
        throw new Error()
    }
  },
  (response, promise) => {
    const { status } = response
    let message = '服务器连接失败'
    switch (status) {
      case 502:
        message = '网关错误:502'
        break;
      case 503:
        message = '系统维护:503'
        break;
      case 504:
        message = '网关错误:504'
        break;
      case 505:
        message = '无效协议:505'
        break;
    }
    wx.$showToast(message)
    return promise.resolve(null)
  }
)
fly.config.baseURL = host()
wx.$fly = fly
