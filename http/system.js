module.exports = {
  getHolidayInfo: async data => {
    const holiday = await wx.$fly.get('/systemService/system/checkHoliday', data, { token: false })
    wx.$store.data.storeHoliday = holiday
    holiday instanceof Array && wx.reLaunch({ url: '/pages/holiday/index' })
  },
  getAdvertList: data => {
    return wx.$fly.get('/systemService/system/getSystemAdvertListByPark', data, { token: false, cache: 1 })
  }
}
