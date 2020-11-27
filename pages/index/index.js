
import loadData from './loadData'

wx.$create(wx.$store, {
  data: {
    pageLoading: null,
    storeUserInfo: null,
    storeDefaultPark: null
  },
  onLoad () {
    this.setData({ pageLoading: new Date().getTime() })
  },
  onReady () {
    wx.$store.data.storeAppLoad && loadData(this)
    wx.$event.on('appLoad', this, () => loadData(this))
    wx.$event.on('userLogin', this, () => loadData(this))
    wx.$event.on('userLogout', this, () => console.info(1))
  },
  bindClick () {
    wx.$store.logout()
  }
})
