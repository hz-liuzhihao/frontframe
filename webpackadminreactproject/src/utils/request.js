import { message } from 'antd';
import axios from 'axios';

/**
 * 解析响应数据
 * @param {*} response
 */
function parseJSON(response) {
  return response;
}

/**
 * 检查响应状态
 * @param {*} response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.common['isAjax'] = true;

let startTime;
/**
 * 请求方法
 * @param {*} url
 * @param {*} data
 */
function fetch(url, data) {
  startTime = new Date().getTime();
  return axios.post(url, data);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url 请求url
 * @param  {object} data 发出post请求的数据
 * @return {object}
 */
export default function request(url, data) {
  return fetch(url, data)
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => {
      let endTime = new Date().getTime();
      console.log(`请求url:${url}, 请求时间:${endTime - startTime}`);
      return response.data || response.json();
    })
    .catch((err) => {
      console.log(err);
      let endTime = new Date().getTime();
      console.log(`请求url:${url}, 请求时间:${endTime - startTime}`);
      const data = err.response && err.response.data;
      data && message.error(data.msg);
      return data || { code: -1, msg: '请求错误', success: false };
    });
}
