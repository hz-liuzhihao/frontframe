//获取用户信息组件:把getUserInfo 返回的res传给服务端可以获取到uniqueid
//也可以获取敏感信息,例如 openId/unionId
import pageDispatcher from '../../utils/pageDispatcher';

//获取应用实例
const app = getApp()

Component({
  /**
   * 组件的属性列表,type必须填否则报错
   */
  properties: {

    back: {
      type: Boolean,
      value: false
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  // 生命周期
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })

        this.toIndexorBack();
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

          this.toIndexorBack();
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            //全局保存用户信息
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })

            this.toIndexorBack();
          }
        })
      }

    },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      // console.log(e)
      //全局保存用户信息
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

      this.toIndexorBack();
    },

    toIndexorBack() {
      //登陆后跳转首页或回退前面页面
      if (this.properties.back) {
        wx.navigateBack({
          delta: 0,
        })
      } else {
        setTimeout(() => {
          pageDispatcher.dispatchPage(1, {});
        }, 1000);

      }
    }
  }
})
