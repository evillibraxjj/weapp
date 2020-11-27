module.exports = {
  getUserOrderStatus: data => wx.$fly.get('/orderService/record/getUserOrderStatus', data)
}
