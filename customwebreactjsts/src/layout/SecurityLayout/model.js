import { AppNavigator, hasLogin } from '../../utils/common';
import { PAGE_CONFIG } from '../../utils/config';
import { NotLoginPages } from '../../config/notLoginConfig';
import { queryUserInfo } from './service';
import { message } from 'antd';

let isFirst = true;

export default {
  namespace: PAGE_CONFIG.securityLayout,
  state: {
    needLogin: false,
    userInfo: {},
    markMap: {}
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *queryUserInfo({ }, { call, put }) {
      const res = yield call(queryUserInfo, {});
      const { success, data, msg } = res || {};
      if (success) {
        isFirst = false;
        const marks = data.marks;
        const markMap = {};
        marks.forEach(item => (markMap[item] = true));
        yield put({
          type: 'save',
          payload: {
            userInfo: data,
            markMap
          }
        });
      } else {
        message.error(msg);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (NotLoginPages.indexOf(pathname) == -1 && isFirst) {
          const isLogin = hasLogin();
          // 其他界面未登录,跳转到登录页面
          if (!isLogin) {
            AppNavigator.jump(
              `/login?redirect_url=${encodeURIComponent(pathname + search)}`
            );
          } else {
            dispatch({
              type: 'queryUserInfo'
            });
          }
        }
      });
    },
  },
};
