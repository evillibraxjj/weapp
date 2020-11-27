require('./utils/index')
require('./http/index')
require('./behavior/index')
require('./store/index')
App({
  async onLaunch () {
    await wx.$fly.all([wx.$http.system.getHolidayInfo(), wx.$http.address.getDefaultPark(), wx.$http.user.getUserInfo()])
    wx.$store.data.storeAppLoad = true
    wx.$store.update()
    //全局广播小程序初始化完成
    wx.$event.emit('appLoad')
  }
})
