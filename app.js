//app.js
App({

  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {

  },
  onShow: function (options) {

  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {

  },
  globalData: {
    userImgSrc: "../../icons/avatar.png",
    userName: "Hi 游客",
    openid: "",
    isLogin:false,
    userId:-1,
    url:"172.16.80.144:8080"
  }
});