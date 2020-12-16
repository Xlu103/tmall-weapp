const app = getApp();
const serverUrl = app.globalData.url;
//Page Object
Page({
  data: {
    /* 轮播图数组 */
    swiperList: [],
    /* 首页一块一块的数据 */
    iconList: [],
    array: [1, 2, 3, 4, 5, 6],
    produceArray: []
  },
  /* 页面开始加载的时候就会触发的事件 */
  onLoad: function (options) {
    /* 发送请求获取轮播图数据 */
    wx.request({
      url: 'http://' + serverUrl + '/tmall/home/swiper/img',
      success: (result) => {
        console.log(result);
        this.setData({
          swiperList: result.data
        })
      }
    });


    // 获取首页块数据的内容
    wx.request({
      url: 'http://' + serverUrl + '/tmall/home/chunk/data',
      success: (result) => {
        console.log(result);
        this.setData({
          iconList: result.data
        })
      }
    });

    // 获取首页商品数据，这里是将所有的商品都展示到首页里面来
    wx.request({
      url: 'http://' + serverUrl + '/tmall/produce/recommend',
      success: (result) => {
        this.setData({
          produceArray: result.data
        })
      }
    })
  },
  clickChunk: function () {
    wx.showToast({
      title: '功能未开发',
      icon: "none"


    })
  }
});