import loadData from './loadData'
wx.$create(wx.$store, {
  data: {
    pageLoading: new Date().getTime(),
    storeToken: null,
    storeUserInfo: null,
    storeUserPark: null,
    storeUserCar: null,
    storeDefaultPark: null
  },
  onReady () {
    wx.$store.data.storeAppLoad && loadData(this)
    wx.$event.on('appLoad', this, () => loadData(this))
    wx.$event.on('userLogin', this, () => loadData(this))
  }
})
