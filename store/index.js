import create from './create'

const data = () => {
  return {
    storeToken: null,
    storeUserInfo: null,
    storeUserPark: null,
    storeUserCar: null,
  }
}

wx.$create = create
wx.$store = {
  data: {
    storeAppLoad: false,
    storeHoliday: null,
    storeDefaultPark: null,
    ...data()
  },
  updateAll: false,
  logout () {
    this.data = {
      ...this.data,
      ...data()
    }
    wx.removeStorageSync('accessToken')
    this.update()
    wx.$event.emit('userLogout')
  }
}
