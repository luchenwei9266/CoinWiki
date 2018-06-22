const AV = require('../../key.js');

Page({
    data: {
        coinObject: {},
        coinId: ""
    },

    onLoad: function(options) {
        if (options.coinId) {
            wx.showLoading({ title: '加载中' });
            new AV.Query('CoinsAllInfo').equalTo("id", options.coinId).first().then(res => {
                this.setData({ coinObject: res.attributes.data });
                wx.hideLoading();
            }, err => {
                wx.hideLoading();
                console.log(error);
            });
        }
    },

    onShareAppMessage: function(res) {
        return {
            title: `${this.data.coinObject.localization.zh}/ ${this.data.coinObject.localization.en}`,
            path: `pages/coinDetails/index?coinId=${this.data.coinObject.localization.id}`
        }
    },

    onShow: function() {
        wx.getStorage({
            key: 'coin',
            success: (coinObject) => {
                new AV.Query('CoinText').equalTo("symbol", coinObject.data.id).first().then(res => {
                    if (!res) {
                        this.setData({ coinObject: coinObject.data });
                    } else {
                        res = JSON.parse(JSON.stringify(res));
                        coinObject.data.description.zh = res.text_zh;
                        this.setData({ coinObject: coinObject.data });
                    }
                }, (err) => {
                    console.log(err);
                })
            }
        })
    },

    joinCompared: function() {
        wx.getStorage({
            key: 'comparedCoin',
            success: (coinList) => {
                if (coinList.data.length == 0 || coinList.data.length == 1) {
                    coinList.data.push(this.data.coinObject);
                    wx.setStorage({
                        key: "comparedCoin",
                        data: coinList.data,
                        success: function(data) {
                            wx.showToast({
                                title: '加入成功',
                                icon: 'success',
                                duration: 1000
                            })
                        }
                    })
                }
                if (coinList.data.length == 2) {
                    coinList.data[1] = this.data.coinObject;
                    wx.setStorage({
                        key: "comparedCoin",
                        data: coinList.data,
                        success: function(data) {
                            wx.showToast({
                                title: '加入成功',
                                icon: 'success',
                                duration: 1000
                            })
                        }
                    })
                }
            },
            fail: () => {
                let coinList = [];
                coinList.push(this.data.coinObject);
                wx.setStorage({
                    key: "comparedCoin",
                    data: coinList,
                    success: function(data) {
                        wx.showToast({
                            title: '加入成功',
                            icon: 'success',
                            duration: 1000
                        })
                    }
                })
            }
        })
    }
})