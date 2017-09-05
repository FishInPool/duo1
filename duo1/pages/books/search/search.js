var utils = require('../../../utils/utils.js');
var app = getApp();

Page({
  data: {
    books: [],
    totalCount: 0
  },
  onLoad: function (options) {
    var Url = app.globalData.doubanBase + '/v2/book/search?q=' + options.q + '&fields=id,title,rating,images&start=0&count=10';
    this.setData({ q: options.q});
    this.addData(Url);
  },
  addData: function (url) {
    //页面中间loading
    wx.showLoading({
      title: '加载中...',
    });
    utils.http(url, this.processDoubanData);
  },

  processDoubanData: function (bookList) {
    var books = [];
    for (var idx in bookList.books) {
      var book = bookList.books[idx];
      var title = book.title;
      if (title.length >= 7) {
        title = title.substring(0, 7) + "...";
      }
      var temp = {
        title: title,
        average: book.rating.average,
        coverImg: book.images.large,
        bookId: book.id,
        stars: utils.starsArray(book.rating.average)
      }
      books.push(temp);
    }
    
    var count = books.length;
    var total = this.data.totalCount + count;
    var totalBooks = this.data.books.concat(books);
    this.setData({
      books: totalBooks,
      totalCount: total
    });
    wx.hideLoading();
    if (books.length <= 0) {
      console.log("meile");
      wx.showToast({
        title: '已无更多书目',
        image: '/img/info-w.png'
      })
    }
  },

  //到底加载
  onLower: function (event) {
    var nextUrl = app.globalData.doubanBase + '/v2/book/search?q=' + this.data.q + '&fields=id,title,rating,images&start=' + (this.data.totalCount + 1) + '&count=10';
    this.addData(nextUrl);
  },
  //去详情页
  toBook: function (event) {
    wx.navigateTo({
      url: '../book-detail/book-detail?id=' + event.currentTarget.dataset.id
    })
  },
  onShareAppMessage: function () {

  }
})