const app = getApp();
 
const serverUrl=app.globalData.url;
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '登录界面'
    })

  },
  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '正在加载...',
    });

    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userName = res.userInfo.nickName;
              app.globalData.userImgSrc = res.userInfo.avatarUrl;
              console.log("授权成功：用户名为：" + app.globalData.userName)
              // 用户信息
              // console.log(res.userInfo);
              wx.switchTab({
                url: "../user/user"
              })
            }
          })
        }

      }, fail(res) {
        console.log(res);
      }
      , complete(res) {
        console.log(res);

      }
    });

    wx.login({
      success(res) {
        console.log("wx login res");

        if (res.code) {
          // 有了用户code
          console.log(res.code);
          //发起网络请求
          wx.request({
            url: 'http://'+serverUrl+'/tmall/user/getToken',
            method: "POST",
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            success(res) {
              console.log("xlu:req tmall/user/getToken -- res--");
              console.log(res);


              app.globalData.openid = res.data.token;
              console.log("xlu:openid--" + app.globalData.openid);

              // 注册用户
              wx.request({
                url: 'http://'+serverUrl+'/tmall/user/addWxUser',
                method: "GET",
                data: {
                  username: app.globalData.userName,
                  openid: res.data.token
                },
                success(res) {
                  // 将用户的id给到全局变量中
                  app.globalData.userId = res.data.userId
                  console.log(res.data)
                }
              })
              console.log(app.globalData);
              wx.hideLoading({
                success: (res) => { },
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  clickEmailLogin: function (e) {
    wx.showToast({
      title: '功能未开发',
      icon: "none"
    })
  }

})