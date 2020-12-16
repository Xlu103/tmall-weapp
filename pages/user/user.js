const app = getApp();
 
const serverUrl=app.globalData.url;
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
        duration: 1000,
        complete: function (e) {
          wx.navigateTo({
            url: '../login/login',
          })
        }
      })
      return;
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userName: app.globalData.userName,
      userImgSrc: app.globalData.userImgSrc,
      userType: "微信用户"
    })
  },
  /**  
   * 点击我的服务，这里还没开发 
   */
  clickMyService: function (e) {
    if (app.globalData.userId == -1) {
      wx.showToast({
        title: '未登录',
        icon: "none",
        complete: function () {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })
      return;
    }

    let id = e.currentTarget.dataset.id;
    if (id == 0) {
      console.log("这是我的地址");
      wx.navigateTo({
        url: '/pages/address/index/index'
      })
    } else {
      wx.showToast({
        title: '功能为开发',
        icon: "none"
      })
    }

  },
  /**   
   * 点击我的资产
   */
  clickMyProperty: function (e) {
    wx.showToast({
      title: '功能为开发',
      icon: "none"
    })
  },
  onLoad:function(e){
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  }



})