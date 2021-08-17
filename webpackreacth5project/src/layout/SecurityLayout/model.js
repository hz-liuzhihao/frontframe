import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.securityLayout,
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {});
    },
  },
};
