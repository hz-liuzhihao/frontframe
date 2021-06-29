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
    saveBreadcrumbs(state, { payload }) {
      const { breadcrumbs = [] } = state;
      const { origin, target, isReplace, isBack, count = 0 } = payload || {};
      let newBreadcrumbs = [];
      if (isBack) {
        newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length + count);
      } else {
        if (isReplace) {
          const originIndex = breadcrumbs.indexOf(origin);
          newBreadcrumbs = [...breadcrumbs];
          newBreadcrumbs[originIndex] = target;
        } else {
          newBreadcrumbs = [...breadcrumbs];
          newBreadcrumbs.push(target);
        }
      }
      return { ...state, breadcrumbs: newBreadcrumbs };
    },
  },
};
