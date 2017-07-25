var utils = require('../../utils/utils.js');
var app = getApp();

Page({

  data: {
    hidden: true
  },


  onLoad: function (options) {
    var defaultUrl = app.globalData.doubanBase + '/v2/book/search?q=' + '多肉' + '&fields=id,title,rating,images&start=0&count=9';
    //utils.http(defaultUrl, this.processDoubanData);
    this.updateData(defaultUrl);
  },

  updateData: function (url) {
    this.setData({
      hidden: false
    });
    utils.http(url, this.processDoubanData);
  },

  processDoubanData: function (bookList) {
    var books = [];
    for (var idx in bookList.books) {
      var book = bookList.books[idx];
      var title = book.title;
      var temp = {
        title: title,
        average: book.rating.average,
        coverImg: book.images.large,
        bookId: book.id,
        stars: utils.starsArray(book.rating.average)
      }
      books.push(temp);
    }
    this.setData({
      books: books,
      hidden: true
    });
  },
  //之前用来从豆瓣获取数据的方法
  getBooksList: function (url) {
    this.setData({
      hidden: false
    });
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        //console.log(res.data);
        that.processDoubanData(res.data);
      }
    })
  },

  onShareAppMessage: function () {

  }
})