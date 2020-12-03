module.exports = {
  userLogin: async (data) => {
    const accessToken = (await wx.$fly.post('/userService/login/customer', data, { token: false }))?.accessToken || null
    return accessToken && await wx.$http.user.getUserInfo(accessToken) && !wx.$event.emit('userLogin')
  },
  getUserInfo: async (accessToken) => {
    accessToken && wx.setStorageSync('accessToken', accessToken)
    const data = await wx.$fly.get('/userService/fitCustomer/getCustomerInfo')
    if (data) {
      wx.$store.data.storeUserPark = data?.userAddressBo || null
      delete data.userAddressBo
      wx.$store.data.storeUserCar = data?.customerCarBo || null
      delete data.customerCarBo
      const userInfo = data?.customerBaseBo || null
      delete data.customerBaseBo
      wx.$store.data.storeUserInfo = {
        ...userInfo,
        ...data
      }
      wx.$store.data.storeToken = wx.getStorageSync('accessToken')
      return true
    }
    wx.removeStorageSync('accessToken')
    return false
  }
}
