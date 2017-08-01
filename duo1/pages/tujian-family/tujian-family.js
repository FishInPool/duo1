var faData = require("../../data/family.js");

Page({
  data: {
  },
  toGenus:function(event){
    var fId = event.currentTarget.dataset.familyId;
    var urlto="";
    if (fId == "f01" || fId == "f03"){
      urlto = 'genus/genus?fid=' + fId;
    }else{
      urlto = 'species/species?gid=' + fId + "g01";
    }

    wx.navigateTo({
      url: urlto
    })
  },
  onLoad: function (options) {
    this.setData({familyKey:faData.familys});
  },


  onShareAppMessage: function (res) {
       
  }
})