import { PAGE_CONFIG } from '../../utils/config';

export default {
  namespace: PAGE_CONFIG.dictManage,
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {});
    },
  },
};
