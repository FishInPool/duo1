var utils = require('../../utils/utils.js');
var app = getApp();

Page({
  data: {
    books: [],
    totalCount: 0
  },


  onLoad: function (options) {
    var defaultUrl = app.globalData.doubanBase + '/v2/book/search?tag=' + '多肉植物' + '&fields=id,title,rating,images&start=0&count=10';
    this.addData(defaultUrl);
  },

  addData: function (url) {
    //页面中间loading
    wx.showLoading({
      title: '加载中...',
    });
    //导航条loading
    wx.showNavigationBarLoading();
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
    wx.hideLoading();
    wx.hideNavigationBarLoading();
    if (books.length<=0){
      wx.showToast({
        title: '已无更多书目',
        icon: 'info'
      })
    }
    var count = books.length;
    var total = this.data.totalCount + count;
    var totalBooks = this.data.books.concat(books);
    this.setData({
      books: totalBooks,
      totalCount: total
    });
    
  },
  //到底加载
  onLower: function (event) {
    var nextUrl = app.globalData.doubanBase + '/v2/book/search?tag=' + '多肉植物' + '&fields=id,title,rating,images&start=' + (this.data.totalCount + 1) + '&count=10';
    this.addData(nextUrl);
  },
  //搜索框获取到焦点
  onFocus:function(){
    
  },

  //搜索框提交信息
  onConfirm:function(event){
    var query =event.detail.value;
    if(query){
      wx.navigateTo({
        url: 'search/search?q='+query
      })
    }
  },

  //去详情页
  toBook:function(event){
    wx.navigateTo({
      url: 'book-detail/book-detail?id=' + event.currentTarget.dataset.id
    })
  },

  //之前用来从豆瓣获取数据的方法
  getBooksList: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        that.processDoubanData(res.data);
      }
    })
  },


  onShareAppMessage: function () {

  }
})