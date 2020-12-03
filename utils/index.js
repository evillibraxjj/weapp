wx.$showToast = title => {
  wx.showToast({
    title: title,
    icon: 'none',
    mask: true
  })
}

require('./fly')
require('./event')
wx.$utils = {
  numPad (num, n) {
    let len = num.toString().length;
    while (len < n) {
      num = '0' + num
      len++
    }
    return num;
  },
  ...require('./sha1')
}
