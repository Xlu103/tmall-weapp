# tmall

> 课程设计小项目 

### 小程序接口文档

- 接口文档更新万完善中：https://www.showdoc.com.cn/xlu103tmallminiprogram?page_id=0

### 小图预览

![image-20201215092622974](https://i.loli.net/2020/12/15/JRFmlUD9gtP1zjC.png)

### 后台使用SSM框架实现

- 链接：https://github.com/Xlu103/tmall_mini_program_back_end

### 引入第三方组件库或依赖

> 生产环境下可将未使用的组件代码删除减少代码包体积大小，文件位置位于lib文件夹下，或使用nmp直接导入，不会占用内存

- [Vant Weapp](https://github.com/youzan/vant-weapp)：UI组件库
- [iView Weapp](https://github.com/TalkingData/iview-weapp)：UI组件库
- [Wux Weapp](https://github.com/wux-weapp/wux-weapp)：UI组件库



### 设计参考

> 所有样式及icon素材并未直接COPY
>
> 除付款页面，地址页面，地址编辑页面外，其余页面均只参考效果图，样式以及实现逻辑均独立编写
- 锤子商城H5
- 网易严选H5
- 网易严选小程序
- 网易严选App
- 京东商城小程序
- [xmall-weapp](https://github.com/Exrick/xmall-weapp)

### 未开发功能
- 商品分类，以及分类搜索
- 首页中的天猫国际那一栏
- 购物车中的删除
- 用户邮箱登录，邮箱验证
- 优惠卷功能，付款的时候抵扣
- 商品被删除的时候，应该将一个是否上架的字段更改，并不是将所有的购物车中的该商品删除
- 订单按状态划分，后端的订单管理
- 客服功能
- 后端轮播图的管理功能
- 推荐商品使精准推荐 
  - 推荐算法，根据用户购买过的商品的主体内容，计算出相关的商品 （键盘-键盘垫），根据用户的相似度，其他用户买过这件物品后购买了其他物品，那也可以推荐
  - 使用协同过滤算法得出推荐的商品进行推荐
  - 参考项目 [商品推荐系统](https://github.com/MrQuJL/product-recommendation-system)
