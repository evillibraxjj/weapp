let code = null
wx.$create({
  options: {
    multipleSlots: true
  },
  data: {
    storeAppLoad: null,
    storeToken: null,
    loginLoading: false,
    loginShowModel: null
  },
  pageLifetimes: {
    hide () {
      wx.nextTick(() => this.setData({ loginShowModel: false, loginLoading: false }))
    }
  },
  methods: {
    async bindChenaLogin () {
      this.setData({ loginShowModel: !this.data.loginShowModel && (code = (await wx.login())?.code) != undefined || false })
    },
    async bindLogin (e) {
      this.setData({ loginLoading: true }, async () => {
        e && e.detail
          && (await wx.$http.user.userLogin({ code, wxUserInfo: e.detail }))
          && (this.setData({ loginShowModel: false, loginLoading: false }, wx.$store.update) || true)
          || this.setData({ loginLoading: false })
      })
    }
  }
})
