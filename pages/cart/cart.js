var app = getApp();
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的
    cartItems: [],
    // 存放该用户购物车项所有商品的的数组
    cartProduces: [],
    // 共计金额
    totalPrice: 0,
    // 共计数量
    totalCount: 0,
    // 选中的商品数组索引id
    selectProduceIds: [],
    // 是否全选标志
    isSelectAll: false,
    // 是否有选择
    isSelectHave: false
  },


  /**
   * 购物车页面中的结算按钮
   * 将所有所选项提交到后端，生成新的订单
   * 然后跳转到订单页面
   */
  settleAccount: function () {

    wx.showLoading({
      title: "请稍后",
    })

    console.log("发起结账功能！！");
    console.log(this.data.selectProduceIds);
    let totalPrice = this.data.totalPrice;
    let items = this.data.cartItems;
    let orderId = '';
    let userId = app.globalData.userId;
    wx.request({
      url: 'http://172.16.80.145:8080/tmall/order/addOrder',
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
            wx.request({
              url: 'http://172.16.80.145:8080/tmall/order/addOrderItem',
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
          }
        }
      }
    })
    wx.hideLoading({})
    wx.navigateTo({
      url: '../order/success',
    })
  },


  /**
   * 点击商品图片的时候跳转到商品的详细页面 
   */
  clickCartItemImg: function (e) {
    let pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../produce/produce?id=' + pid
    })
  },

  /**
   * 公有的向后端发起更改购物车项数量的请求
   * @param {商品的条的真实id} id 
   * @param {商品的数量} count 
   */
  requestUpdateProduceCount: function (id, count) {
    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: 'http://172.16.80.145:8080/tmall/cart/update',
      data: {
        id: id,
        count: count
      },
      success: function (res) {
        console.log("修改购物车数量成功！！");
        wx.hideLoading({})
      }
    })

  },

  /**
   * 点击增加增加或者减少的按钮
   * 修改商品数量 
   */
  clickAddOrSub: function (e) {
    // 该按钮的类型，这里只有两种取值，一种是+，一种是-
    let type = e.currentTarget.dataset.type;
    // 这里对应的是数组中真实的id
    let id = e.currentTarget.dataset.id;

    let cartItems = this.data.cartItems;
    let count = cartItems[id].count;
    if (type == "add") {

      count += 1;
      if (count > cartItems[id].produce.sales) {
        count = cartItems[id].produce.sales;
        wx.showToast({
          title: '已经为最大库存',
          icon: "none",
          duration: 500
        })
      }
    } else if (type == "sub") {
      count -= 1;
      if (count <= 0) {
        wx.showToast({
          title: '不允许为负值',
          icon: "none",
          duration: 500
        })
        return;
      }


    }

    cartItems[id].count = count;
    let totalPrice = 0;
    let totalCount = 0;
    let isSelectHave = false;

    // 遍历一下所有元素，判断是否有选中的，和记录下总数和总金额
    for (let i = 0; i < cartItems.length; i++) {
      // 如果有选中的
      if (cartItems[i].checked) {
        isSelectHave = true;
        totalCount += parseInt(cartItems[i].count);
        totalPrice += (cartItems[i].produce.price) * (cartItems[i].count);
      }
    }
    this.setData({
      cartItems: cartItems,
      totalCount: totalCount,
      totalPrice: totalPrice,
      isSelectHave: isSelectHave
    })
    this.requestUpdateProduceCount(cartItems[id].id, count);
  },

  /**
   * 当商品的数量改变的时候，触发这个函数
   */
  changeInputNum: function (e) {
    let id = e.currentTarget.dataset.id;

    let cartItems = this.data.cartItems;
    let count = cartItems[id].count;
    let inputNum = e.detail.value;


    var reg = /^[1-9][0-9]*$/;
    if (!reg.test(inputNum)) {
      wx.showToast({
        title: '不合法输入',
        icon: "none",
        duration: 1000
      })
      return count;
    }

    if (inputNum > cartItems[id].produce.sales) {
      inputNum = cartItems[id].produce.sales;
      wx.showToast({
        title: '已经为最大库存',
        icon: "none",
        duration: 1000
      })
    }

    if (inputNum <= 0) {
      wx.showToast({
        title: '不允许为负值',
        icon: "none",
        duration: 1000
      })
      return count;
    }

    let totalPrice = 0;
    let totalCount = 0;
    let isSelectHave = false;
    cartItems[id].count = (inputNum);
    // 遍历一下所有元素，判断是否有选中的，和记录下总数和总金额
    for (let i = 0; i < cartItems.length; i++) {
      // 如果有选中的
      if (cartItems[i].checked) {
        isSelectHave = true;
        totalCount += parseInt(cartItems[i].count);
        totalPrice += (cartItems[i].produce.price) * (cartItems[i].count);
      }
    }
    this.setData({
      cartItems: cartItems,
      totalCount: totalCount,
      totalPrice: totalPrice,
      isSelectHave: isSelectHave
    })
    this.requestUpdateProduceCount(cartItems[id].id, count);

  },

  /**
   * 复选框事件
   * 对购物车页面中的所有复选框进行事件监听
   */
  clickChecked: function (e) {
    // 选择哪一个复选框，虽然这里写着name，但是除了全选按钮是name之后，其他的都是id
    // id表示着在cartItems数组中的真实位置
    let checkedName = e.currentTarget.dataset.name;

    // 选中的状态
    let checked = e.currentTarget.dataset.checked;

    console.log(checkedName + ":" + !checked);

    let cartItems = this.data.cartItems;

    if (checkedName == "checked-all") {
      // 如果是全选复选框

      this.setData({
        isSelectAll: !checked
      })
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].checked = this.data.isSelectAll;
      }

    } else {
      // 如果不是全选按钮，那么就是购物车中的项了

      // 增加可读性
      let arrayId = checkedName;
      checked = !checked;
      // 改变选中的状态
      cartItems[arrayId].checked = checked;


    }


    let totalPrice = 0;
    let totalCount = 0;
    let isSelectHave = false;

    // 遍历一下所有元素，判断是否有选中的，和记录下总数和总金额
    for (let i = 0; i < cartItems.length; i++) {
      // 如果有选中的
      if (cartItems[i].checked) {
        isSelectHave = true;
        totalCount += cartItems[i].count;
        totalPrice += (cartItems[i].produce.price) * (cartItems[i].count);
      }
    }

    this.setData({
      cartItems: cartItems,
      totalCount: totalCount,
      totalPrice: totalPrice,
      isSelectHave: isSelectHave
    })

  },

  /**
   * 监听页面显示
   * 在这里判断用户是否已经登录，如果还没有登录就会提示，然跳转登录页面，如果已经登录，那么就在后端获取购物车系统，然后封装一下！！！
   */
  onShow: function (options) {
    let userId = app.globalData.userId;

    let that = this;
    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: 'http://172.16.80.145:8080/tmall/cart/all',
      data: {
        userId: userId
      },
      success: function (res) {
        let cartItems = res.data.items;
        let cartProduces = res.data.produces;
        let totalCount = 0;

        // 隐藏正在加载
        wx.hideLoading({})

        for (let i = 0; i < cartItems.length; i++) {
          cartItems[i].produce = cartProduces[i];
          // 将所有购物车项初始化为未选中
          cartItems[i].checked = false;
          // 添加一个数组id,这个数组id用来记录该记录在数组中的真实索引
          cartItems[i].arrayId = i;
          totalCount = totalCount + (Number)(cartItems[i].count);
        }

        that.setData({
          cartItems: cartItems,
          cartProduces: cartProduces,
          totalCount: totalCount
        })
      }
    })
  }


})