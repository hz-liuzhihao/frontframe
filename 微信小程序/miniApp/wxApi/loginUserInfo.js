// 登陆和获取用户信息 api调用


export default {


  login() {
    return new Promise((resolve, reject) => {

      wx.login({
        timeout: 15000,
        success(res) {
          if (res.code) {
            // 用户登录凭证（有效期五分钟）。
            // 开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid / session_key /uniqueId 等信息
            resolve({
              code: res.code
            });
          } else {
            notifaction.showToast('哎呀~微信登陆失败了,再试一次吧');
          }
        },
        fail(res) {
          notifaction.showToast('哎呀~微信登陆失败了,再试一次吧');
        },
        complete(res) {
          // 接口调用结束的回调函数（调用成功、失败都会执行
        }

      })
    })
  },

  userInfo() {

  },

}