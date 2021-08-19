import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.baseLayout,
  state: {
    activeIndex: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == "/aboutxqh") {
          dispatch({
            type: "save",
            payload: {
              activeIndex: 1,
            },
          });
        } else if (pathname == "/concatxqh") {
          dispatch({
            type: "save",
            payload: {
              activeIndex: 2,
            },
          });
        } else {
          dispatch({
            type: "save",
            payload: {
              activeIndex: 0,
            },
          });
        }
      });
    },
  },
};
