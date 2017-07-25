var speData = require("../../../data/spes.js");
Page({
  data: {
  },
  onLoad: function (options) {
    var gid = "spes_" + options.gid;
    var spes = speData[gid];
    this.setData({ speKey: spes });
  },
  toDetail: function (event) {
    var sid = event.currentTarget.dataset.speId;
    //console.log(sid);
    wx.navigateTo({
      url: '../detail/detail?sid='+sid
    })
  },

  onShareAppMessage: function () {

  }
})