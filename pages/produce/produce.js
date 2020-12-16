const app = getApp();
const serverUrl=app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    produceData: {},
    produceId: 0,
    // 是否是第一次加载
    first: true
  },
  /**
   * 添加商品到购物车
   */
  addProduceToCart: function (e) {
    let produceId = e.currentTarget.dataset.id;
    let userId = app.globalData.userId;
    // 如果用户已经登录
    if (userId != -1) {
      console.log("用户id -- ：" + userId);
      console.log("商品id -- ：" + produceId);
      wx.showLoading({
        title: '请稍等'
      })
      wx.request({
        url: 'http://'+serverUrl+'/tmall/cart/add',
        data: {
          "userId": userId,
          "produceId": produceId,
          "count": 1
        },
        success: function (res) {
          wx.hideLoading({})
          wx.showToast({
            title: '添加成功',
            debugger: 1000
          })
          console.log(res);

        }
      })
    } else {
      // 如果用户还没有到登录
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1000
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login'
        })
      }, 1000)

    }
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("请求到了produce文件中的onload");
    
    wx.showLoading({
      title: '请稍等...',
    })
    var that = this;
    this.setData({
      produceId: options.id
    })
    wx.request({
      url: 'http://'+serverUrl+'/tmall/produce/searchId',
      data: {
        id: options.id
      },
      success(res) {
        that.setData({
          produceData: res.data,
          first:false
        });
        wx.hideLoading({})
      }
    })
  },
  
  onShow: function () {
      console.log("请求来到了produce中的onShow");
      
    if (!this.data.first) {
      wx.showLoading({
        title: '请稍等...',
      })
      var that = this;
      wx.request({
        url: 'http://'+serverUrl+'/tmall/produce/searchId',
        data: {
          id: that.data.produceId
        },
        success(res) {
          that.setData({
            produceData: res.data
          });
          wx.hideLoading({})
        }
      })
    }
  },
  clickCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})