var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [{
      "id": 0,
      "title": "未付款",
      "imgSrc": "../../image/pay.png"
    },
    {
      "id": 1,
      "title": "待发货",
      "imgSrc": "../../image/send.png"
    },
    {
      "id": 2,
      "title": "已发货",
      "imgSrc": "../../image/toSend.png"
    },
    {
      "id": 3,
      "title": "待评价",
      "imgSrc": "../../image/comment.png"
    },
    {
      "id": 4,
      "title": "售后服务",
      "imgSrc": "../../image/afterSale.png"
    },
    ],
    assetData: [{
      "id": 0,
      "number": 0,
      "title": "优惠卷"
    },
    {
      "id": 1,
      "number": 2,
      "title": "积分"
    }, {
      "id": 2,
      "number": 0,
      "title": "红包"
    }, {
      "id": 3,
      "number": 0,
      "title": "津贴"
    }, {
      "id": 4,
      "number": 0,
      "title": "礼品卡"
    }
    ],
    userName: "",
    userImgSrc: "",
    userType: "点击登录"
  },
  clickOrderItem: function (e) {
    let index = e.currentTarget.dataset.id;
    let userId = app.globalData.userId;
    if (userId == -1) {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration:1000,
        complete: function (e) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
      return ;
    }
    wx.navigateTo({
      url: "../order/order?index=" + index
    })
  },
  clickLogin: function (e) {
    wx.navigateTo({
      url: "../login/login"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userName: app.globalData.userName,
      userImgSrc: app.globalData.userImgSrc,
      userType: "微信用户"
    })

  },



})