import { poLogin, psLogin } from '../services/common';
import { GLOBAL_CONFIG } from '../utils/config';
import { message } from 'antd';
import { AppNavigator, hasLogin } from '../utils/common';

/**
 * 全局安全数据model
 * 1. 登录操作;
 * 2. 登录信息;
 */
export default {
  namespace: GLOBAL_CONFIG.security,

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const isLogin = hasLogin();
        if (pathname == '/login') {
          // 如果用户已经登录跳转到主页
          if (isLogin) {
            AppNavigator.jump('/', true);
          }
        }
      });
    },
  },

  effects: {
    *psLogin({ payload }, { call, put }) {
      const res = yield call(psLogin, payload);
      const { success, msg } = res || {};
      if (success) {
      } else {
        message.error(msg || '密码登录失败');
      }
    },
    *poLogin({ payload }, { call, put }) {
      const res = yield call(poLogin, payload);
      const { success, msg } = res || {};
      if (success) {
      } else {
        message.error(msg || '手机号登录失败');
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
