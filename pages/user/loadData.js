const getAdvertList = async () => {
  const { storeDefaultPark, storeUserPark } = wx.$store.data
  const parkId = (storeUserPark?.parkId || storeDefaultPark?.parkId || 0)
  return await wx.$http.system.getAdvertList({ advertApp: 1, advertLocation: 2, objectId: parkId })
}
exports.appLoad = async (self) => {
  const data = await wx.$fly.all([getAdvertList()])
  self.setData({
    pageAdvertList: data[0],
  })
}
exports.userLogout = async (self) => {
  self.setData({
    pageAdvertList: await getAdvertList(),
  })
}
