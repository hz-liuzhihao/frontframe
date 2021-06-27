import { AppNavigator, hasLogin } from '../../utils/common';
import { PAGE_CONFIG } from '../../utils/config';
import { NotLoginPages } from '../../config/notLoginConfig';

export default {
  namespace: PAGE_CONFIG.securityLayout,
  state: {
    needLogin: false,
  },
  reducers: {},
  effects: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (NotLoginPages.indexOf(pathname) == -1) {
          const isLogin = hasLogin();
          // 其他界面未登录,跳转到登录页面
          if (!isLogin) {
            AppNavigator.jump(
              `/login?redirect_url=${encodeURIComponent(pathname + search)}`
            );
          }
        }
      });
    },
  },
};
