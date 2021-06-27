//登陆页面,没登陆都转到这个页面登陆信息app.js全局保存
import tools from '../utils/tools';
import notifaction from '../utils/notifaction';
import action from '../http/action';
import goods from '../model/userclient/goodsListBs'
import loginUser from '../wxApi/loginUserInfo'
import actionUrl from '../http/actionUrl';

const app = getApp();

export default {
  datas: {
    loging: false //是否正在执行登陆
  },
  LoginInfo(retry = 0) {

    try {
      const response = new Promise((resolve, reject) => {
        //某页面可能同时请求多个接口，都需要登陆信息，控制登陆并发。一次只进入一个
        //一次没登陆成功,其他排队重试，
        if (retry <= 5 && this.datas.loging) {
          setTimeout(() => {
            try {
              retry += 1;
              this.LoginInfo(retry).then((res) => {
                //拿到登陆结果抛出，业务接口使用
                resolve(res);
              });
            } catch (error) {
              this.datas.loging = false
            }
          }, 1000);

          return;
        } else if (retry > 5) {
          return;
        }


        //判断是否已登陆
        if (!app.globalData.userCookie) {
          this.datas.loging = true; //防止多接口并发触发登陆

          //微信登陆
          loginUser.login().then((res) => {
            let me = this;
            if (res.code) {
              //微信登陆成功返回code传递我们自己的登陆接口获取userCookie/openId用户标识

              let requestHeader = {
                'isAjax': 'true',
                'content-type': 'application/json;charset=UTF-8',
              };

              wx.request({
                timeout: 15000,
                url: app.data.baseUrl + actionUrl.data.login,
                data: {
                  code: res.code
                },
                header: requestHeader,
                // method:'GET',默认不写
                success(result) {

                  me.datas.loging = false;

                  if (result && result.data) {
                    if (result.data.success) {
                      if (result.data.data !== undefined) {
                        //本地保存登陆成功标识
                        app.globalData.userCookie = result.data.data.cookie;
                        app.globalData.hasLogin = true;

                        //返回登陆成功
                        resolve({ success: true });
                      }
                    } else {
                      //登陆接口失败
                      resolve({ success: false, errorCode: -1, message: result.msg, severInfo: result });

                    }
                  } else {

                    resolve({ success: false, errorCode: -1, message: result.msg, severInfo: result });
                  }
                },
                fail(result) {
                  me.datas.loging = false;

                  resolve({ success: false, errorCode: -111, message: '服务器打盹了,请稍后', severInfo: result });
                },
                complete(result) {
                }
              });
            }
          });
        }
        else {
          resolve({ success: true });
        }
      }).catch((e) => { });

      //返回promose
      return response;

    } catch (error) {
      return { success: false, errorCode: -111, message: '服务器打盹了,请稍后', severInfo: error };
    }

  },
}