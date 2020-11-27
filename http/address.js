module.exports = {
  getDefaultPark: async data => {
    wx.$store.data.storeDefaultPark = await wx.$fly.get('/addressService/park/getDefaultPark', data, { token: false })
  }
}
