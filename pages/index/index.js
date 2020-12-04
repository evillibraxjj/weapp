
import { appLoad, userLogout } from './loadData'
import create from '../../store/create'
create(wx.$store, {
  data: {
    storeUserInfo: null,
    pageLoading: null,
    pageOrderPrompt: null,
    pageAdvertList: null,
    pageAdvertIndex: 0
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
  bindChangeSwiper (e) {
    this.setData({ pageAdvertIndex: e.detail.current })
  },
  bindTapLogout () {
    wx.$store.logout()
  },
})
