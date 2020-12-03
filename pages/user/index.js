
import { appLoad, userLogout } from './loadData'

wx.$create(wx.$store, {
  data: {
    storeUserInfo: null,
    storeDefaultPark: null
  },
  onShow () {
    wx.$http.user.getUserInfo()
  },
  onReady () {
    wx.$store.data.storeAppLoad && appLoad(this)
    wx.$event.on('appLoad', this, () => appLoad(this))
    wx.$event.on('userLogin', this, () => appLoad(this))
    wx.$event.on('userLogout', this, () => userLogout(this))
  },
  bindClick () {
    wx.$store.logout()
  }
})
