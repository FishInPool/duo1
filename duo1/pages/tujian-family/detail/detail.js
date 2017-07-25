var speData = require("../../../data/spes.js");
Page({
  data: {

  },
  onLoad: function (options) {
    var sid = options.sid;
    var gid = "spes_" + sid.substr(0, 6);
    var spes = speData[gid];
    var spedetail;
    spes.forEach(function (e) {
      if (e.speId==sid){
        spedetail=e;
      }
    });
    console.log(spedetail);
    this.setData(spedetail);
  },

  onShareAppMessage: function () {

  }
})