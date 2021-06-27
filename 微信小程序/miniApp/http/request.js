
import login from "./login";
import MD5 from '../utils/md5.js'
import tools from '../utils/tools'

const app = getApp();

export default {

  data: {
    reloginCount: 0 //登陆重试次数
  },

  //核心业务方法,有的数据接口并不需要登陆
  async fetch(path, method, params, header, needLlogin) {
    let loginRes = {}
    if (needLlogin && !app.globalData.userCookie) {
      loginRes = await login.LoginInfo();
    }

    return new Promise((resolve, reject) => {
      //15s还没拿到结果，直接超时
      let resolved = false;

      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          let result = this.resolveObject(-3, '网络开小差,请稍后重试~', {});
          resolve(result);
        }
      }, 15 * 1000);


      //需要登陆且结果有错误,比如登陆错误码
      if (needLlogin && !app.globalData.userCookie) {
        if (loginRes.errorCode !== 0) {
          resolved = true;
          let result = this.resolveObject(-1, loginRes.message, loginRes.severInfo);
          resolve(result);
          return;
        }
      }

      //method是get请求参数需要加密传输的
      if (method === 'GET' && JSON.stringify(params) === '{}') {
        params = null;
      }
      let signParam = '';
      if (method === 'GET' && params) {
        let signParamStr = tools.sortParamsString(params);
        signParamStr += 'ulcookie=' + app.globalData.userCookie;
        signParam = MD5.md5(signParamStr);
      }

      //头信息
      let requestHeader = {
        ...header,
        'isAjax': 'true',
        ulcookie: app.globalData.userCookie,
        sign: signParam,

      };
      //post类型接收json格式数据(参数要json转换)
      if (method === 'POST') {
        if (path.indexOf('?') < 0) {
          requestHeader['content-type'] = 'application/json;charset=UTF-8';
        }
      }

      //发起请求
      wx.request({
        url: patch,
        method: method,
        data: params,
        dataType: 'JSON',
        header: requestHeader,
        timeout: 15000,
        success(res) {
          //具体业务接口请求成功
          if (res.data !== undefined) {
            const { data, success } = res.data; //结果
            if (success) {
              resolved = true;
              if (data !== undefined) {
                resolve({ errorCode: 0, data: data, severData: res.data }); //返回数据
              } else {
                //没数据
                resolve({ errorCode: 0, data: { success: true }, severData: res.data });//成功但是没数据
              }
            } else if (res.data.code === 'NOT_LOGIN') {
              //页面一直停留不动本地登陆信息在，结果服务端请求发现登陆超时抛错误码
              if (this.data.reloginCount > 3) {
                //尝试3次登陆后直接抛出登陆异常
                this.data.reloginCount = 0;
                resolved = true;

                let result = this.resolveObject(-1, '登陆失败', res.data);
                resolve(result);

                return;
              }
              //本地累计登陆次数
              this.data.reloginCount++;
              //重新请求业务（里面会先判断登陆）
              app.globalData.userCookie = '';

              //继续调业务,里面继续登陆
              fetch(path, method, params, header, needLlogin).then((res) => {
                resolved = true;
                resolve(res);
              });

            } else {
              //其他异常 code
              let result = this.resolveObject(res.data.code, res.data.desc, res.data);
              resolved = true;
              resolve(result);
            }
          } else {
            //服务器异常data结果完全没有
            let result = this.resolveObject(-11, '服务器打盹了,请稍后', res);
            resolved = true;
            resolve(result);
          }
        },
        fail(res) {
          let result = this.resolveObject(-111, '服务器打盹了,请稍后', res);
          resolved = true;
          resolve(result);
        },
        complete(res) { }
      });
    });
  },

  resolveObject(code, msg, severInfo) {
    let result = {
      errorCode: code,
      message: msg,
      severInfo: severInfo
    };
    return result;
  },
}