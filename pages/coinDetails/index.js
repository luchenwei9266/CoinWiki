const URL = 'https://api.coingecko.com/api/v3/coins/';

Page({
    data: {
        coinObject: {},
        coinId: ""
    },

    onLoad: function(options) {
        if (options.coinId) {
            wx.showLoading({ title: '加载中' })
            wx.request({
                url: URL + options.coinId,
                success: function(res) {
                    wx.hideLoading();
                    this.setData({ coinObject });
                },
                fail: function(error) {
                    wx.hideLoading();
                    console.log(error);
                }
            })
        }
    },

    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.coinObject.localization.zh + "/" + this.coinObject.localization.en,
            path: 'pages/coinDetails/index?coinId=' + this.coinObject.localization.id,
            imageUrl: this.coinObject.image.small
        }
    },

    onShow: function() {
        let coinObject = wx.getStorageSync("coin");
        this.setData({ coinObject });
    }

})