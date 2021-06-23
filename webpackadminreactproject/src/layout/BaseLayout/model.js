import { PAGE_CONFIG } from '../../utils/config';

export default {
  namespace: PAGE_CONFIG.baseLayout,
  state: {
    pathname: '/',
  },
  reducers: {
    save(state, { payload: newState = {} }) {
      return { ...state, ...newState };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        dispatch({
          type: 'save',
          payload: {
            pathname: pathname.split('?')[0]
          }
        });
      });
    },
  },
};
