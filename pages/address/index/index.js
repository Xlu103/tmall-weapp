
var app = getApp();
const serverUrl=app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseMode: false,
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址管理',
    })
    let that = this;
    wx.request({
      url: 'http://'+serverUrl+'/tmall/address/all',

      data: {
        userId: app.globalData.userId
      }, success: function (res) {
        let addressList = res.data.addressList;
        for (let i = 0; i < addressList.length; i++) {
          addressList[i].checked = false;
          addressList[i].isDefault = addressList[i].default;
        }
        console.log(addressList);
        that.setData({
          addressList: addressList
        })
      }
    })


    // 如果是选择从结账那里过来，那么这里就是选择地址
    // 在选择地址的时候遍历所有地址，通过他被点击了，那么就将他设置为选中
    // 选中的话，在地址列表中在地址的左边显示出来
    if (options.chooseMode == "true") {
      this.setData({
        chooseMode: true
      })

      this.data.addressList.forEach(function (v, index) {
        if (options.addressId == v.id) {
          that.setData({
            [`addressList[${index}].checked`]: true
          });
        }
      })
    }
  },
  /**
   * 删除地址
   */
  deleteAddress: function (e) {
    let id = e.currentTarget.dataset.value.id;
    let data = [];

    this.data.addressList.forEach(function (v) {
      if (id != v.id) {
        data.push(v);
      }
      if (id == v.id) {
        if (v.isDefault) {
          // 如果被删除的这个是默认的地址,就不对劲了
          // 要将地址中的第一个设置为默认地址,如果没有地址的话
          // 算了先不做
        }
      }

    })
    this.setData({
      addressList: data
    })


    // 调用api删除地址记录
    wx.request({
      url: 'http://'+serverUrl+'/tmall/address/delete',
      data: {
        id: id
      }
    })


  },
  /**   
   * 编辑地址
   */
  editAddress: function (e) {
    let data = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/address/edit/edit?edit=true&id=' + data.id + '&name=' + data.name + '&mobile=' + data.mobile + '&address=' + data.address + '&street=' + data.street + '&isDefault=' + data.isDefault
    })
  },
  /**  
   * 添加地址
   */
  addAddress: function () {
    wx.navigateTo({
      url: '/pages/address/edit/edit'
    })
  },

  /**   
   * 导入地址,调用微信
   */
  importAddress: function () {
    wx.chooseAddress({
      success(res) {
        let address = res.provinceName + " " + res.cityName + " " + res.countyName;
        wx.navigateTo({
          url: '/pages/address/edit/edit?import=true&name=' + res.userName + '&mobile=' + res.telNumber + '&address=' + address + '&street=' + res.detailInfo
        })
      }
    })
  },
  chooseAddress: function (e) {
    if (this.data.chooseMode) {
      let address = e.currentTarget.dataset.value;

      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];  //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address: address
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})