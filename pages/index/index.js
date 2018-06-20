//index.js
//获取应用实例
const app = getApp()
const AV = require('../../key.js');
const URL = 'https://api.coingecko.com/api/v3/coins/';

Page({
    data: {
        coinList: Object,
        inputValue: ''
    },
    //事件处理函数

    onReady: function() {
        this.getCoinList();
    },

    getCoinList() {
        new AV.Query('Coins').descending('createdAt').first().then(res => {
            res = res.attributes.list;
            this.data.coinList = JSON.parse(res);
        })
    },

    goSearch() {
        if (this.data.inputValue.length == 0 || !this.data.inputValue) {
            wx.showToast({
                title: '请确认搜索关键字是否正确！',
                icon: 'none',
                duration: 1500
            })

            return false;
        } else {
            let data = this.data.coinList[this.data.inputValue];

            wx.showLoading({ title: '加载中' })
            if (data) {
                wx.request({
                    url: URL + data,
                    success: function(res) {
                        wx.hideLoading();
                        wx.setStorage({
                            key: "coin",
                            data: res.data,
                            success: function(data) {
                                wx.navigateTo({
                                    url: '../coinDetails/index'
                                });
                            }
                        })
                    },
                    fail: function(error) {
                        wx.hideLoading();
                        console.log(error);
                    }
                })
            } else {
                wx.request({
                    url: URL + this.data.inputValue,
                    success: function(res) {
                        wx.hideLoading();
                        wx.setStorage({
                            key: "coin",
                            data: res.data,
                            success: function(data) {
                                wx.navigateTo({
                                    url: '../coinDetails/index'
                                });
                            }
                        })
                    },
                    fail: function(error) {
                        wx.hideLoading();
                        console.log(error);
                    }
                })
            }
        }
    },

    bindInput(e) {
        this.setData({
            inputValue: (e.detail.value).toLocaleLowerCase()
        })
    },

    blurblur(e) {
        this.setData({
            inputValue: (e.detail.value).toLocaleLowerCase()
        })
    }

})