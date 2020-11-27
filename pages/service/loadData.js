
const getUserOrderStatus = async () => {
  const data = await wx.$http.order.getUserOrderStatus()
  return false
}

export default async (self) => {
  self.setData({ ...(await getUserOrderStatus()) }, () => wx.nextTick(() => {
    const loading = self.data.pageLoading
    setTimeout(() => self.setData({ pageLoading: null }), 2000 - new Date().getTime() + loading)
  }))
}
