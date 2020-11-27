let code = null
wx.$create({
  options: {
    multipleSlots: true
  },
  data: {
    storeToken: null,
    loginLoading: false,
    loginShowModel: false
  },
  pageLifetimes: {
    hide () {
      wx.nextTick(() => this.setData({ loginShowModel: false, loginLoading: false }))
    }
  },
  methods: {
    async bindChenaLogin () {
      this.setData({ loginShowModel: !this.data.loginShowModel && (code = (await wx.login())?.code || null) != null || false })
    },
    async bindLogin (e) {
      this.setData({ loginLoading: true }, async () => {
        e && e.detail
          && (await wx.$http.user.userLogin({ code, wxUserInfo: e.detail }))
          && !(this.setData({ loginShowModel: false, loginLoading: false }, () => wx.$store.update()))
          || this.setData({ loginLoading: false })
      })
    }
  }
})
