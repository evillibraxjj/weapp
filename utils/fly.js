const cacheDB = {}, fly = new require('../lib/flyio')()
const host = () => {
  if (__wxConfig && __wxConfig.envVersion) {
    switch (__wxConfig.envVersion) {
      case 'develop':
        return 'https://api.dev3.loookauto.com'
      // return 'https://api.test.loookauto.com'
      case 'trial':
        return 'https://api.test.loookauto.com'
    }
  }
  return 'https://api.loookauto.com'
}
const getRequestCache = (request) => {
  if (request.cache > 0 && cacheDB.hasOwnProperty(request.flyioKey)) {
    const cache = cacheDB[request.flyioKey] || {}, keyUrl = wx.$utils.sha1(request.baseURL + request.url)
    if (cache.hasOwnProperty(keyUrl)) {
      const urlCache = cache[keyUrl], keyBody = wx.$utils.sha1(JSON.stringify(request.body))
      if (urlCache.hasOwnProperty(keyBody)) {
        const bodyCache = urlCache[keyBody], time = bodyCache.time, curTime = new Date(time.setMinutes(time.getMinutes() + request.cache))
        //缓存时间 单位分钟
        if (new Date() < curTime) return bodyCache.data
        delete urlCache[keyBody], (Object.keys(cache[keyUrl]).length == 0 && delete cache[keyUrl])
      }
    }
  }
  return request
}

const setRequestCache = (request, data) => {
  if (data && request.cache > 0) {
    const cache = cacheDB[request.flyioKey] || {}, keyUrl = wx.$utils.sha1(request.baseURL + request.url), keyBody = wx.$utils.sha1(JSON.stringify(request.body))
    Object.assign(cache, { [keyUrl]: { ...cache[keyUrl], [keyBody]: { time: new Date(), data } } })
    cacheDB[request.flyioKey] = cache
  }
}

fly.interceptors.request.use((request, promise) => {
  const token = wx.getStorageSync('accessToken')
  if (request.token != false && !token) return promise.resolve(null)
  request.headers = { 'X-Tag': 'flyio', 'content-type': 'application/json', 'access_token': token }
  const userInfo = wx.$store.data.storeUserInfo
  //将会影响数据的参数区分缓存池
  const KeyData = {
    userId: userInfo?.customerId || 0,
    identity: userInfo?.identity || 0,
    isMembership: userInfo?.isMembership || 0,
    parkId: wx.$store.data.storeUserPark?.parkId || wx.$store.data.storeDefaultPark?.parkId || 0,
    carId: wx.$store.data.storeUserCar?.carId || 0
  }
  request.flyioKey = wx.$utils.sha1(JSON.stringify(KeyData))
  return getRequestCache(request)
})

fly.interceptors.response.use(
  (response) => {
    const { status, request } = response
    switch (status) {
      case 200:
        const { code, data, message } = response.data
        message && wx.$showToast(message)
        switch (parseInt(code)) {
          case 200:
            setRequestCache(request, data)
            return data || code
          case 401:
            wx.$showToast('请登录'), wx.$store.logout()
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
