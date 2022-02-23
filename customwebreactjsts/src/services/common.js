import request from '../utils/request';

export function query() {
  return request('/api/users');
}

/**
 * 密码登录
 */
export function psLogin(data) {
  return request('/oauth/pslogin', data);
}

/**
 * 手机号登录
 */
export function poLogin(data) {
  return request('/oauth/pologin', data);
}

/**
 * 获取验证码
 * @param {*} data 
 * @returns 
 */
export function validateCode(data) {
  return request('/oauth/validatecode', data);
}

/**
 * 退出登录
 * @param {*} data 
 * @returns 
 */
export function logout(data) {
  return request('/oauth/logout', data);
}
