const app = getApp();
 
const serverUrl=app.globalData.url;
Page({


  data: {
    // 当前页面的索引
    pageIndex: 0,
    orders: [],
    userId: -1
  },

  /**
   * 点击订单首部导航
   *  */
  clickOrderTop: function (e) {
    let index = e.currentTarget.dataset.id;
    this.setData({
      pageIndex: index
    })
  },

  /**
     * 点击搜索结果,跳转到每一个订单的页面
     */
  clickItem: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/produce/produce?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录界面'
    })
    wx.showLoading({
      title: '加载中',
    })

    let userId = app.globalData.userId;
    let that = this;

    console.log(options);
    let index = 0;

    if (options != undefined) {
      let index = options.index;
    }
    this.setData({
      pageIndex: index
    })

    // 请求订单数据
    wx.request({
      url: 'http://'+serverUrl+'/tmall/order/find',
      data: {
        userId: userId
      },
      success: function (res) {
        console.log(res.data);
        let orders = res.data.orders;
        that.setData({
          orders: orders
        })
        wx.hideLoading({})
      }
    })

  },

  onShow: function (e) {
    wx.setNavigationBarTitle({
      title: "我的订单"
    })
    this.setData({
      userId: app.globalData.userId
    })

    let that = this;

    
    // 请求订单数据
    wx.request({
      url: 'http://'+serverUrl+'/tmall/order/find',
      data: {
        userId: app.globalData.userId
      },
      success: function (res) {
        console.log(res.data);
        let orders = res.data.orders;
        that.setData({
          orders: orders
        })
        wx.hideLoading({})
      }
    })
  },
  /** 
   * 点击删除订单的按钮
   */
  clickDeleteOrder: function (e) {
    let that = this;
    let orderId = e.currentTarget.dataset.orderid;
    console.log("delete order by Id:" + orderId);

    wx.showModal({
      title: '提示',
      content: '确认删除订单',
      success: function (res) {
        if (res.confirm) {
          console.log('确定删除订单，正在发起请求！！')
          wx.showLoading({
            title: '请求中'
          })
          wx.request({
            url: 'http://'+serverUrl+'/tmall/order/delete',
            data: {
              orderId: orderId
            },
            success: function (res) {
              console.log(res);

              wx.hideLoading();

              // 重新加载页面
              that.onLoad();
            }
          })

        } else if (res.cancel) {
          console.log('取消删除订单')
        }
      }
    })
  }
})