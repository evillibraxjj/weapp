
export default async (self) => {
  self.setData({ pageOrderPrompt: await wx.$http.order.getUserOrderStatus() }, () => wx.nextTick(() => {
    const loading = self.data.pageLoading
    setTimeout(() => self.setData({ pageLoading: null }), 2000 - (new Date().getTime()) + loading)
  }))
}
