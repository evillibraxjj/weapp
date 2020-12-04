require('./utils/index')
require('./http/index')
require('./behavior/index')
require('./store/index')

wx.$menu = {
  ...wx.getMenuButtonBoundingClientRect()
}

const loadFontFace = (family) => {
  wx.loadFontFace({
    global: true,
    family: family.split('.')[0],
    source: `url("https://lookprd-oss.oss-cn-shenzhen.aliyuncs.com/font/${family}")`
  })
}

App({
  async onLaunch () {
    const data = await wx.$fly.all([wx.$http.system.getHolidayInfo(), wx.$http.address.getDefaultPark(), wx.$http.user.getUserInfo()])
    const appLoad = data[1] || false
    wx.$store.data.storeAppLoad = !!appLoad
    wx.$store.update()
    appLoad && wx.$event.emit('appLoad') //全局广播小程序初始化完成
    wx.nextTick(() => {
      appLoad && loadFontFace('TXXCHJ.ttf')
      appLoad && loadFontFace('Oswald-Bold.otf')
    })
  }
})
