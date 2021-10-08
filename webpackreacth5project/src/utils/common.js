let paramMap;

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
  params.forEach(item => {
    const kv = item.split('=');
    paramMap[kv[0]] = kv[1];
  });
  return paramMap[name];
}

/**
 * 是否在微信中
 */
export function isWxClient() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
}