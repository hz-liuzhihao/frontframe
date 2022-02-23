import request from "../../utils/request";

/**
 * 获取用户信息
 * @param {*} data 
 * @returns 
 */
export function queryUserInfo(data) {
  return request('/oauth/user/info', data);
}
