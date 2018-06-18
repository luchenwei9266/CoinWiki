
Page({
  data: {
    coinObject: {}
  },

  onShow: function () {
    let coinObject = wx.getStorageSync("coin");
    console.log(coinObject);
    this.setData({coinObject});
  }

})
