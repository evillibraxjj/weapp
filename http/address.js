module.exports = {
  getDefaultPark: async data => {
    const defaultPark = await wx.$fly.get('/addressService/park/getDefaultPark', data, { token: false })
    wx.$store.data.storeDefaultPark = defaultPark
    return defaultPark
  }
}
