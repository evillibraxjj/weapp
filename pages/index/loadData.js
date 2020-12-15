const getAdvertList = async () => {
  const { storeDefaultPark, storeUserPark } = wx.$store.data
  const parkId = (storeUserPark?.parkId || storeDefaultPark?.parkId || 0)
  return await wx.$http.system.getAdvertList({ advertApp: 1, advertLocation: 1, objectId: parkId })
}

exports.appLoad = async (self) => {
  const data = await wx.$fly.all([wx.$http.order.getUserOrderStatus(), getAdvertList()])
  self.setData(
    {
      pageOrderPrompt: data[0],
      pageAdvertList: data[1],
    },
    () => wx.nextTick(() => {
      const loading = self.data.pageLoading
      setTimeout(() => self.setData({ pageLoading: null }), 2000 - (new Date().getTime()) + loading)
    })
  )
}

exports.userLogout = async (self) => {
  self.setData({
    pageOrderPrompt: null,
    pageAdvertList: await getAdvertList(),
  })
}
