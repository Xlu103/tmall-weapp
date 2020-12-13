// pages/catalog/catalog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cataDataArray: [{
      id: 0,
      title: "推荐专区"
    }, {
      id: 1,
      title: "今日爆款"
    }, {
      id: 2,
      title: "生活居家"
    }, {
      id: 3,
      title: "美食酒水"
    }, {
      id: 4,
      title: "服饰鞋包"
    }, {
      id: 5,
      title: "数码产品"
    }],
    currentCataIndex: 0,

  },
  clickCata: function (e) {
    var indexId = e.currentTarget.dataset.id;
    this.setData({
      currentCataIndex: indexId
    })
  }
})