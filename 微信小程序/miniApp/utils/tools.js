

//工具类

export default {

  //版本比较
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i], 10)
      const num2 = parseInt(v2[i], 10)

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },

  //深拷贝
  getType(obj) {
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'funtion',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object',
    };
  },
  deepClone(data) {
    const type = this.getType(data);
    let obj;
    if (type === 'array') {
      obj = [];
    } else if (type === 'object') {
      obj = {};
    } else {
      return data;//没有下一层次
    }

    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]));
      }
    } else if (type === 'object') {
      for (let key in data) {
        obj[key] = deepClone(data[key]);
      }
    }
    return obj;
  },


  //首字母排序
  sortParamsString(params) {
    let paramsTemp = params;
    if (params instanceof String) {
      paramsTemp = JSON.parse(params);
    }
    let paramKeys = Object.keys(paramsTemp);
    let sortParamKeys = paramKeys.sort();
    let sortParamStr = '';
    sortParamKeys.forEach((item) => {
      let strValue = params[item];
      sortParamStr += item;
      sortParamStr += '=';
      sortParamStr += strValue;
      sortParamStr += '&';
    });
    return sortParamStr;
  },


  //网络判断
  hasNetWork() {
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success(res) {
          if (res.networkType !== 'none') {
            resolve({ netHassError: false });
          } else {
            resolve({ netHassError: true });
          }
        }
      })
    });
  },

  onNetworkStatusChange() {
    return new Promise((resolve, reject) => {
      wx.onNetworkStatusChange(function (res) {
        resolve({ hasConnect: res.isConnected });
      })
    });
  },


  //存储
  saveStorage(keyName, valueObj) {
    wx.setStorage({
      data: valueObj,
      key: keyName,
    })
  },
  getStorage(keyName) {
    wx.getStorage({
      key: keyName,
    })
  },
  saveStorageSync(keyName, valueObj) {
    wx.setStorageSync(keyName, valueObj)
  },
  getStorageSync(keyName) {
    wx.getStorageSync(keyName);
  },

  deleteStorage(keyName) {
    wx.deleteStorage(keyName);
  }


}