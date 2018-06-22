const URL = 'https://api.coingecko.com/api/v3/coins/';
const AV = require('../../key.js');

Page({
    data: {
        coinOrigin: {},
        coinTarget: {}
    },

    onLoad: function(options) {
        wx.getStorage({
            key: 'comparedCoin',
            success: (coinList) => {
                this.setData({
                    coinOrigin: coinList.data[0],
                    coinTarget: coinList.data[1]
                })
            }
        });
    },

    onShow: function() {
        wx.getStorage({
            key: 'comparedCoin',
            success: (coinList) => {
                this.setData({
                    coinOrigin: coinList.data[0],
                    coinTarget: coinList.data[1]
                })
            }
        });
    },

    clearCompared: function() {
        wx.clearStorage();
        this.setData({
            coinOrigin: {},
            coinTarget: {}
        })
        wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1000
        })
        wx.switchTab({
            url: '/pages/index/index'
        })
    }


})