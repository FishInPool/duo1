var utils = require('../../../utils/utils.js');
var app = getApp();

Page({
  data: {
  },
  onLoad: function (options) {
    var id = options.id;
    var url = app.globalData.doubanBase + '/v2/book/' + id;
    this.addData(url);
  },

  addData: function (url) {
    //导航条loading
    wx.showNavigationBarLoading();
    utils.http(url, this.processDoubanData);
  },

  processDoubanData: function (data) {
    var bookData = {};
    var author = '';
    if (data.author[0] != null) {
      author = author + data.author[0];
      if (data.author.length>1){
        for(var i=1;i<data.author.length;i++){
          author = author + '、' + data.author[i];
        }
      }
    }
    var tags=[];
    for (var i = 0; i < data.tags.length;i++){
      tags.push(data.tags[i].name);
    }
    bookData = {
      img: data.images.large,
      name: data.title,
      author: author,
      pages: data.pages,
      publisher: data.publisher,//出版社
      price: data.price,
      summary: data.summary,//简介
      average: data.rating.average,//评分
      stars: utils.starsArray(data.rating.average),//星星
      tags: tags,
      catalog: data.catalog//目录
    }
    this.setData(bookData);
    wx.setNavigationBarTitle({
      title: data.title
    })
    wx.hideNavigationBarLoading();
  },

  showImg:function(event){
    
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  onShareAppMessage: function () {

  }
})