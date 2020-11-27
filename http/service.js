module.exports = {
  getType: data => wx.$fly.get('/lookService/type/getMaxType', data, { token: false }),
  getList: data => wx.$fly.get('/lookService/service/getServiceOfType', data, { token: false })
}
