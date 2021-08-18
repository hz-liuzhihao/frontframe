import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.articleDetail,
  state: {
    data: {
      content: [
        {
          type: 0,
          value: "asdfadfasdfasdfasdfasdfadsfadsf",
        },
        {
          type: 1,
          value: ["http://image.xingqinghao.com/img/xqh.png"],
        },
      ],
      title: "测试title",
      time: "08-03 12:31",
    },
  },
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {});
    },
  },
};
