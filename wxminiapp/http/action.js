
//所有业务方法调用写这里
import fetchData from './request'
import login from './login'
import urlInfo from './actionUrl'
import MD5 from '../utils/md5.js'

const app = getApp();

export default {
  data: {
    ...urlInfo.data,
  },


  //单独登陆
  loginRequest() {

    return new Promise((resolve, reject) => {
      if (!app.globalData.userCookie) {
        login.LoginInfo().then((res) => {
          if (res.success) {
            resolve({ errorCode: 0, message: '登陆成功' });

          } else {
            let result = res;

            resolve(result); //res有json结构返回
          }
        }).catch(err => {
          resolve({ errorCode: -1, message: '登陆异常' + JSON.stringify(err) });
        });
      } else {
        resolve({ errorCode: 0, message: '登陆成功' });
      }
    });

  },


  //其他action业务
  //post
  getTuanList() {
    let params = {};
    return new Promise((resolve, reject) => {
      fetchData.fetch(this.data.tuanList, 'POST', JSON.stringify(params)).then(res => {

        resolve(res);
      }).catch(err => {
        resolve({ errorCode: -5, message: '异步异常' });
      });
    });
  },
  //get
  getGoodsListByTuan(tuanId, pageNo, pageSize) {
    return new Promise((resolve, reject) => {

      fetchData.fetch(this.data.goodsListByTuan, 'GET', { tuanId: tuanId, currPageNo: pageNo, limit: pageSize }, {}).then(res => {
        resolve(res);
      }).catch(err => {
        resolve({ errorCode: -5, message: '异步异常' });
      });
    });
  },
}