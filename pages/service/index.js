import { appLoad, userLogin } from './loadData'
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
    wx.$store.data.storeAppLoad && appLoad(this)
    wx.$event.on('appLoad', this, () => appLoad(this))
    wx.$event.on('userLogin', this, () => appLoad(this))
    wx.$event.on('userLogin', this, () => userLogin(this))
  }
})
