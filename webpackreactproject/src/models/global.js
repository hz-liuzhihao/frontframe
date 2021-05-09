
/**
 * 全局数据model
 * 1. 通用字典请求;
 * 2. 全局数据共享
 */
export default {

  namespace: 'global',

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
