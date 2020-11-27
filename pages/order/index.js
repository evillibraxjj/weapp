wx.$create(wx.$store, {
  data: {
    storeUserInfo: null,
    storeDefaultPark: null
  },
  onReady () {
    const { loadData } = this
    wx.$store.data.storeAppLoad && loadData()
    wx.$event.on('appLoad', this, () => loadData())
    wx.$event.on('userLogin', this, () => loadData())
  },
  loadData () {
    console.info('order loadData')
  }
})
