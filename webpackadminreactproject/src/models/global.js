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
      const { breadcrumbs = [], title } = state;
      const { origin, target, isReplace, isBack, count = 0 } = payload || {};
      let newBreadcrumbs = [];
      if (isBack) {
        newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.length + count);
      } else {
        if (isReplace) {
          const originIndex = breadcrumbs.findIndex(
            (item) => item.path == origin
          );
          newBreadcrumbs = [...breadcrumbs];
          newBreadcrumbs[originIndex] = {
            path: target,
            count: newBreadcrumbs.length,
          };
        } else {
          newBreadcrumbs = [...breadcrumbs];
          const originIndex = breadcrumbs.findIndex(
            (item) => item.path == origin
          );
          if (originIndex == -1) {
            newBreadcrumbs.push({
              path: origin,
              count: newBreadcrumbs.length,
              title: title || '无',
            });
          }
          const node = newBreadcrumbs[newBreadcrumbs.length - 1];
          newBreadcrumbs[newBreadcrumbs.length - 1] = {
            ...node,
            title: title || '无',
          };
          newBreadcrumbs.push({
            path: target,
            count: newBreadcrumbs.length,
          });
        }
      }
      return { ...state, breadcrumbs: newBreadcrumbs };
    },
  },
};
