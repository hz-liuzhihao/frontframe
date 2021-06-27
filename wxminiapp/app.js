//app.js
const config = require('./utils/configInfo')


App({
  data: {
    appEnv: 1, //0线上环境, 1 项目环境
    baseUrl: '',//api接口主域名
    systemInfo: {},// 系统版本设备信息等
  },

  globalData: {//要放到前面否则onlanch里面使用的时候说undefined

    userCookie: '', //服务器端登陆成功标识 
    openid: null, //服务端登陆返回;会话密钥 session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。

    hasLogin: false, //表示是否微信已登陆

    userInfo: null, //null判断是否为空,头像昵称
  },


  onLaunch: function () {

    switch (this.data.appEnv) {
      case 0: {
        this.data.appVersion = '1.1.0';
        this.data.baseUrl = config.baseUrl;
        break;
      }
      case 1: {
        this.data.appVersion = '1.1.0';
        this.data.baseUrl = config.devBaseUrl;
        break;
      }

    }


    //方法不能再包 直接平铺即可
    this.systemInfo();

    this.getUserinfo();

  },
  onError() {
    //全局报错日志
  },
  onShow() {

  },
  onHide() {

  },

  //全局方法
  systemInfo() {
    wx.getSystemInfo({
      success: (result) => {
        // this.data.systemInfo =
        JSON.stringify(result)
      },
      fail: (res) => { },
      complete: (res) => { },
    })
  },
  //用户信息,如果之前已经授权过可以直接提前获取,不会弹窗口
  getUserinfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
            
              let info = res.userInfo;
              this.globalData.userInfo = info


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况,userInfo组件里面有用到
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })



  },

})