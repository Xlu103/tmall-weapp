// pages/checkout/checkout.js
import Toast from '../../../lib/vant-weapp/toast/toast';
const app = getApp();
 
const serverUrl=app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址
    address: {
      id: 1,
      isDefault: true,
      name: 'Exrick',
      mobile: '17621230884',
      address: '四川省成都市武侯区',
      street: '益州大道香月湖7栋188号'
    },
    // 总金额
    totalPrice: 0,
    // 购物车项
    cartItems: [

    ],
    // 用户id
    userId: -1,
    // 是否同意
    agree: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.action = "settle") {
      console.log("开始结账");



      let pages = getCurrentPages();
      //上一个页面，从上一个页面获取到数据，用于发起请求提交订单
      let prevPage = pages[pages.length - 2];
      let totalPrice = prevPage.data.totalPrice;
      // 商品列表
      let items = prevPage.data.cartItems;
      let userId = prevPage.data.userId;

      let address = {};
      let that = this;
      wx.request({
        url: 'http://'+serverUrl+'/tmall/address/all',

        data: {
          userId: userId
        }, success: function (res) {
          let addressList = res.data.addressList;
          for (let i = 0; i < addressList.length; i++) {
            addressList[i].checked = false;
            addressList[i].isDefault = addressList[i].default;
            if (addressList[i].default) {
              address = addressList[i];
              console.log("默认地址：：");

              console.log(address);
              that.setData({
                address: address
              })
            }

          }
        }
      });

      this.setData({
        cartItems: items,
        totalPrice: totalPrice,
        userId: userId,
      })
    }
  },

  /** 
   * 更改同意按钮
   */
  changeAgree: function (e) {
    this.setData({
      agree: e.detail
    })
  },

  /**  
   * 选择地址
   */
  chooseAddress: function () {
    wx.navigateTo({
      url: '/pages/address/index/index?chooseMode=true&addressId=' + this.data.address.id,
    })
  },

  /**  
   * 下单
   */
  submitOrder: function () {

    // 如果没有点击同意按钮
    if (!this.data.agree) {
      return;
    }

    let totalPrice = this.data.totalPrice;
    let items = this.data.cartItems;
    let orderId = '';
    let userId = this.data.userId;

    wx.request({
      url: 'http://'+serverUrl+'/tmall/order/addOrder',
      data: {
        userId: userId,
        price: totalPrice
      }, success: function (res) {
        orderId = res.data.order.orderId;
        console.log(res.data.order.orderId);
        for (let i = 0; i < items.length; i++) {
          // 如果为选中
          if (items[i].checked) {
            let price = items[i].produce.price;
            let count = items[i].count;
            let produceId = items[i].produce.id;
            let title = items[i].produce.title;
            let imgPath = items[i].produce.img;

            // 添加订单项
            wx.request({
              url: 'http://'+serverUrl+'/tmall/order/addOrderItem',
              data: {
                orderId: orderId,
                price: price,
                count: count,
                produceId: produceId,
                title: title,
                imgPath: imgPath,
              }, success: function () {
              }
            })

            // 删除购物车中的项
            wx.request({
              url: 'http://'+serverUrl+'/tmall/cart/deleteSettle',
              data: {
                id: items[i].id
              }, success: function (res) {

              }
            })
          }
        }
      }
    })
    wx.hideLoading({})
    wx.redirectTo({
      url: '/pages/order/success',
    })


  }
})