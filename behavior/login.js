module.exports = Behavior({
  data: {
    showLogin: false
  },
  pageLifetimes: {
    hide () {
      this.setData({
        showLogin: false
      })
    }
  },
  methods: {
    async bindChenaLogin () {
      const { showLogin } = this.data
      this.setData({
        showLogin: !showLogin
      })
    },
    async bindLogin (e) {
      e && e.detail && (await wx.$http.user.userLogin({ wxUserInfo: e.detail })) && this.setData({ showLogin: false }, wx.$store.update)
    }
  }
})
