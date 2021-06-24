import { GLOBAL_CONFIG } from "../utils/config";

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
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};