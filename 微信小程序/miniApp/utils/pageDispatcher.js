// 页面跳转都写这里
export default {
  pageType: {
    login: 0,
    //用户端1-50
    goodsList: 1, //首页团长商品列表
    myOrder: 2,//我的订单
    goodDetails: 3,//商品详情
    shopPing: 4,//购买
    mytuan: 5,//我加入的团
    myself: 6,//用户个人信息收货地址等维护

    //团长端 51-100
    goods: 51,//商品列表
    orders: 52,//所有订单
    money: 53,//佣金管理
    my: 54,//个人信息
  },

  //无参
  dispatchPage(type) {
    this.dispatchPage(type, {});
  },

  //有参数json
  dispatchPage(type, paramsObj) {

    let targetPage = '';
    switch (type) {
      case this.pageType.login:
        targetPage = '/pages/login/login.js';
        break;
      case this.pageType.goodsList:
        targetPage = '/pages/userclient/goodsList/goods';
        break;
      case this.pageType.myOrder:
        targetPage = '/pages/userclient/myOrder/orders';
        break;
      case this.pageType.goodDetails:
        targetPage = '/pages/userclient/goodDetails/details';
        break;
      case this.pageType.shopPing:
        targetPage = '/pages/userclient/shopPing/buy';
        break;


      case this.pageType.goods:
        targetPage = '/pages/groupleader/goods/goods';
        break;
      case this.pageType.money:
        targetPage = '/pages/groupleader/money/money';
        break;
      case this.pageType.orders:
        targetPage = '/pages/groupleader/orders/orders';
        break;
      case this.pageType.my:
        targetPage = '/pages/groupleader/my/my';
        break;

      default:
        break;
    }

    //参数拼接
    if (paramsObj) {
      let params = '';
      for (let keyName in paramsObj) {
        params += keyName + '=' + paramsObj[keyName] + '&'
      }

      targetPage = targetPage + '?' + params
    }


    //跳转
    wx.navigateTo({
      url: targetPage
    })
  },



}