let code = null
wx.$create({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    dark: {
      type: Boolean,
      value: false
    },
    systemHeaderColor:
    {
      type: String,
      value: null
    }
  },
  data: {
    storeAppLoad: null,
    storeToken: null,
    loginLoading: false,
    loginShowModel: null
  },
  ready() {
    this.setData({ pageMenuInfo: wx.$menu })
    this.data.dark && wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.systemHeaderColor || '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  pageLifetimes: {
    hide() {
      wx.nextTick(() => this.setData({ loginShowModel: false, loginLoading: false }))
    }
  },
  methods: {
    async bindChenaLogin() {
      this.setData({ loginShowModel: !this.data.loginShowModel && (code = (await wx.login())?.code) != undefined || false })
    },
    async bindLogin(e) {
      this.setData({ loginLoading: true }, async () => {
        e && e.detail
          && (await wx.$http.user.userLogin({ code, wxUserInfo: e.detail }))
          && (this.setData({ loginShowModel: null, loginLoading: false }, wx.$store.update) || true)
          || this.setData({ loginLoading: false })
      })
    }
  }
})
