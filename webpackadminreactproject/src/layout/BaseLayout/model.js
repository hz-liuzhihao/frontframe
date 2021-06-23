import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.baseLayout,
  state: {
    collapsed: false
  },
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {});
    },
  },
};
