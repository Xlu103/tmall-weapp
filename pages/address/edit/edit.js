// pages/address/edit/edit.js
import {
  areaData
}
  from "../../../lib/area.js"
import Toast from '../../../lib/vant-weapp/toast/toast';
const app = getApp();
const serverUrl=app.globalData.url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      id: "",
      name: "",
      mobile: "",
      address: "",
      street: "",
      isDefault: false
    },
    show: false,
    areaList: areaData,
    edit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '编辑地址',
    })
    // 或编辑或导入,终究躲不过 :)
    if (e.edit == "true") {
      this.setData({
        edit: true,
        'form.id': e.id,
        'form.name': e.name,
        'form.mobile': e.mobile,
        'form.address': e.address,
        'form.street': e.street
      })
    } else if (e.import == "true") {
      this.setData({
        edit: false,
        'form.id': e.id,
        'form.name': e.name,
        'form.mobile': e.mobile,
        'form.address': e.address,
        'form.street': e.street
      })
    }

    // 若你默认便将你默认
    if (e.isDefault == "true") {
      this.setData({
        'form.isDefault': true
      })
    } else {
      this.setData({
        'form.isDefault': false
      })
    }
  },

  onChangeName: function (e) {
    this.setData({
      'form.name': e.detail
    })
  },
  onChangeMobile: function (e) {
    this.setData({
      'form.mobile': e.detail
    })
  },
  onChangeStreet: function (e) {
    this.setData({
      'form.street': e.detail
    })
  },
  changeDefault: function (e) {
    this.setData({
      'form.isDefault': e.detail
    })
  },
  /**   
   * 调用微信接口导入地址
   */
  importAddress: function () {
    let that = this;
    wx.chooseAddress({
      success(res) {
        that.setData({
          'form.name': res.userName,
          'form.mobile': res.telNumber,
          'form.address': res.provinceName + " " + res.cityName + " " + res.countyName,
          'form.street': res.detailInfo
        })
      }
    })
  },

  showSelectAddress: function (e) {
    this.setData({
      show: true
    })
  },

  cancelSelect: function () {
    this.setData({
      show: false
    })
  },

  /**   
   * 选择地址
   */
  selectArea: function (e) {
    let v = e.detail.values;
    let data = v[0].name + " " + v[1].name + " " + v[2].name;
    this.setData({
      'form.address': data,
      show: false
    })
  },
  /**
   * 点击保存按钮
   */
  saveAddress: function () {

    if (this.data.form.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        duration: 1000,
        icon: "none"
      })
      return;
    }

    if (this.data.form.mobile == "") {
      wx.showToast({
        title: '手机号码不能为空',
        duration: 1000,
        icon: "none"
      })
      return;
    }

    if (this.data.form.address == "") {
      wx.showToast({
        title: '省份、城市、区县不能为空',
        duration: 1000,
        icon: "none"
      })
      return;
    }


    if (this.data.form.street == "") {
      wx.showToast({
        title: '详细地址不能为空',
        duration: 1000,
        icon: "none"
      })
      return;
    }

    // 得到当前页面
    let pages = getCurrentPages();
    // 得到上一个页面
    let prevPage = pages[pages.length - 2]; //上一个页面
    // 上一页页面的数据
    let data = prevPage.data.addressList;
    let that = this;



    if (this.data.edit) {
      // 编辑
      data.forEach(function (v, index) {

        wx.request({
          url: 'http://'+serverUrl+'/tmall/address/update',
          data: {
            id: that.data.form.id,
            address: that.data.form.address,
            street: that.data.form.street,
            userId: app.globalData.userId,
            name: that.data.form.name,
            mobile: that.data.form.mobile,
            default: that.data.form.isDefault
          }
        })
        if (v.id == that.data.form.id) {
          data[index] = that.data.form;
        }
      })
    } else {
      // 添加新地址
      wx.request({
        url: 'http://'+serverUrl+'/tmall/address/add',
        data: {
          address: that.data.form.address,
          street: that.data.form.street,
          userId: app.globalData.userId,
          name: that.data.form.name,
          mobile: that.data.form.mobile,
          default: that.data.form.isDefault
        }, success: function (res) {
          console.log(res.data.address.id);
          that.setData({
            'from.id': res.data.address.id
          })
        }
      })
      data.push(this.data.form)
    }


    if (this.data.form.isDefault) {
      // 如果是默认地址，就将其他的地址设置为不是默认地址
      data.forEach(function (v, index) {

        if (v.id == that.data.form.id) {

        } else {
          // 将其他全部设置为不默认
          data[index].isDefault = false;
        }
      })

      // 同步的将数据库也设置为只有他是默认地址
      wx.request({
        url: 'http://'+serverUrl+'/tmall/address/setDefault',
        data: {
          userId: app.globalData.userId,
          addressId: that.data.form.id
        }
      })
    }

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      addressList: data
    })

    Toast.success({
      duration: 0,
      message: '保存成功',
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)

  }
})