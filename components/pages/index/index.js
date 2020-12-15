import {
	appLoad,
	userLogout
} from './loadData.js'
wx.$create({
	data: {
		scrollTop: 0,
		storeUserInfo: null,
		pageLoading: new Date().getTime(),
		pageOrderPrompt: null,
		pageOrderIndex: 0,
		pageAdvertList: null,
		pageAdvertIndex: 0
	},
	ready() {
		this.setData({
			pageMenuInfo: wx.$menu
		})
		wx.$store.data.storeAppLoad && appLoad(this)
		wx.$event.on('appLoad', this, () => appLoad(this))
		wx.$event.on('userLogin', this, () => appLoad(this))
		wx.$event.on('userLogout', this, async () => userLogout(this))
	},
	methods: {
		onPageScroll(e) {
			this.setData(e)
		},
		bindChangeSwiper(e) {
			this.setData({
				pageAdvertIndex: e.detail.current
			})
		},
		bindChangeOrder(e) {
			this.setData({
				pageOrderIndex: e.detail.current
			})
		},
		bindTapLogout() {
			wx.$store.logout()
		},
		bindTapButler(e) {
			console.info(e.currentTarget.dataset)
		}
	},
})