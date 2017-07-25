var genData = require("../../../data/gens.js");
Page({
  data: {

  },
  toSpecies: function (event) {
    var gid = event.currentTarget.dataset.genId;
      wx.navigateTo({
        url: '../species/species?gid='+gid
      })
  },
  onLoad: function (options) {
    var fid = "gens_" + options.fid;
    var gens = genData[fid];

    this.setData({ genKey: gens });
  },

  onShareAppMessage: function () {

  }
})