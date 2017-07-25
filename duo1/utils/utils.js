function starsArray(stars) {
  var num = (stars / 2).toString().substr(0, 3);
  num=parseFloat(num);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      arr.push(2);
    } else if (i <= num + 0.5) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

function http(url,callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'application/xml'
    },
    success: function (res) {
      callBack(res.data);
    }
  })
}

module.exports = {
  starsArray,http
}