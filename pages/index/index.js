const appLoad = (self) => {
  const loading = self.data.pageLoading
  setTimeout(() => self.setData({
    pageLoading: null
  }), 2000 - (new Date().getTime()) + loading)
}
wx.$create(wx.$store, {
  data: {
    pageLoading: new Date().getTime()
  },
  onReady() {
    this.setData({
      pageMenuInfo: wx.$menu
    })
    wx.$store.data.storeAppLoad && appLoad(this)
    wx.$event.on('appLoad', this, () => appLoad(this))
  }
})