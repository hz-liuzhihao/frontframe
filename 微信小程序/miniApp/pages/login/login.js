//登陆页面,需要登陆都跳转这: wx.login的code传给服务端可以获取到openid和session_key(服务端自己保留)及自定义的userCookie登陆标识
import tools from '../../utils/tools';
import notifaction from '../../utils/notifaction';
import action from '../../http/action';


const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: false,

    back: false,//登陆后是否回退到前面页面
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.back !== 'undefined') {
      this.setData({
        back: options.back
      });
    }

    //判断有无登陆
    this.setData({
      hasLogin: app.globalData.hasLogin
    })

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





  userLogin: function (e) {
    action.loginRequest().then((res) => {//登陆会调用wx.login和服务端交互保存userCookie
      if (res.errorCode === 0) {
        this.setData({
          hasLogin: app.globalData.hasLogin, //是否登陆
        });

      } else {
        notifaction.showToast('哎呀~微信登陆失败了,再试一次吧');

        this.setData({
          hasLogin: false,
        });
      }
    });
  }
})