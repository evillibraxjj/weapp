exports.loadData = async (self) => {
  const { storeDefaultPark, storeUserPark } = wx.$store.data
  const parkId = (storeUserPark?.parkId || storeDefaultPark?.parkId || 0)
  const data = await wx.$fly.all([wx.$http.order.getUserOrderStatus(), wx.$http.system.getAdvertList({ advertApp: 1, advertLocation: 1, objectId: parkId })])
  console.info(data)
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
