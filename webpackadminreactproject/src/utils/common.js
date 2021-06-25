import { routerRedux } from 'dva/router';
import { createHashHistory } from 'history';

let paramMap;
const history = createHashHistory();

/**
 * 获取参数
 * @param {*} name
 */
export function getUrlParam(name) {
  if (paramMap) {
    return paramMap[name];
  }
  paramMap = {};
  const search = decodeURI(location.search);
  const searchStr = search.substr(1);
  const params = searchStr.split('&');
  params.forEach((item) => {
    const kv = item.split('=');
    paramMap[kv[0]] = kv[1];
  });
  return paramMap[name];
}

/**
 * 应用内跳转
 */
export class AppNavigator {
  static dispatch;

  static of(dispatch) {
    AppNavigator.dispatch = dispatch;
    return AppNavigator;
  }

  /**
   * 跳转到另一个路由
   * @param {*} params /a/b/c?key=value或者 {pathname: '/a/b/c', search: '?key=value'} 或者 {pathname: '/a/b/c?key=value}
   * @param {*} isReplace 是否替换当前路由 默认false
   * @returns
   */
  static jump(params = {}, isReplace = false) {
    let pathname, search, state;
    if (typeof params == 'string') {
      pathname = params;
    } else {
      pathname = params.pathname;
      search = params.search;
      state = params.state;
    }
    if (pathname && pathname.indexOf('?') > -1) {
      const paths = pathname.split('?');
      pathname = paths[0];
      paths[1] && (search = `?${paths[1]}`);
    }
    const dispatch = AppNavigator.dispatch;
    if (dispatch) {
      return isReplace
        ? dispatch(routerRedux.replace({ pathname, search, state }))
        : dispatch(routerRedux.push({ pathname, search, state }));
    }
    isReplace
      ? history.replace(pathname + search)
      : history.push(pathname + search);
    return new Promise((resolve) => resolve());
  }
}

/**
 * dataURL 转成 blob
 * @param {*} dataUrl
 * @returns
 */
export function dataURLToBlob(dataUrl) {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 函数防抖
 * @param {*} func 函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} immediate true 表立即执行，false 表非立即执行
 * @returns
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 函数节流
 * @param {*} func 函数
 * @param {*} wait 延迟执行毫秒数
 * @param {*} type 1 表时间戳版，2 表定时器版
 * @returns
 */
export function throttle(func, wait, type) {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
}
