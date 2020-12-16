const app = getApp();
 
const serverUrl=app.globalData.url;
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框输入的文本
    searchText: "",
    // 结果集
    searchResult: [],
    // 结果条数
    searchResultCount: 0,
    // 历史结果
    searchHistory: [],
    // 是否显示最后的线
    searchEnd: false,
    // 搜索结果是否显示没搜索到
    searchNotHava: true
  },
  searchProduce: function (e) {
    var that = this
    this.setData({
      searchText: e.detail.value
    })
    wx.showLoading({
      title: '请稍等...',
    })
    wx.request({
      url: 'http://'+serverUrl+'/tmall/produce/searchName',
      data: {
        name: this.data.searchText
      }, success: function (res) {
        console.log("搜索结果：")
        console.log(res.data);
        that.setData({
          searchResult: res.data
        })
        // 如果结果大于0
        if (that.data.searchResult.length > 0) {
          that.setData({
            searchEnd: true,
            searchNotHava: true
          })
        } else {
          that.setData({
            searchEnd: false,
            searchNotHava: false
          })
        }

        wx.hideLoading({})
      }
    })
  },
  /**
   * 点击搜索结果,跳转到每一个订单的页面
   */
  clickItem: function (e) {
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/produce/produce?id='+id,
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})