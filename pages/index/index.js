//index.js
//获取应用实例
const app = getApp()
const AV = require('../../key.js');

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
            let data = this.data.coinList[this.data.inputValue] ? this.data.coinList[this.data.inputValue] : this.data.inputValue;
            wx.showLoading({ title: '加载中' })
            new AV.Query('CoinsAllInfo').equalTo("id", data).first().then(res => {
                wx.setStorage({
                    key: "coin",
                    data: res.attributes.data,
                    success: function(data) {
                        wx.hideLoading();
                        wx.navigateTo({
                            url: '../coinDetails/index'
                        });
                    }
                })
            }, err => {
                wx.hideLoading();
                console.log(error);
            })
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