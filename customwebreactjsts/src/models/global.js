import { AppNavigator } from '../utils/common';
import { GLOBAL_CONFIG } from '../utils/config';

/**
 * 全局数据model
 * 1. 通用字典请求;
 * 2. 全局数据共享
 */
export default {
  namespace: GLOBAL_CONFIG.global,

  state: {
    breadcrumbs: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      AppNavigator.of(dispatch);
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};