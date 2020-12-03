
import { appLoad, userLogout } from './loadData'

wx.$create(wx.$store, {
  data: {
    pageLoading: null,
    storeUserInfo: null,
    storeDefaultPark: null,
    pageOrderPrompt: null,
    pageAdvertList: null
  },
  onLoad () {
    this.setData({ pageLoading: new Date().getTime() })
  },
  onReady () {
    wx.$store.data.storeAppLoad && appLoad(this)
    wx.$event.on('appLoad', this, () => appLoad(this))
    wx.$event.on('userLogin', this, () => appLoad(this))
    wx.$event.on('userLogout', this, async () => userLogout(this))
  },
  bindClick () {
    wx.$store.logout()
  }
})
