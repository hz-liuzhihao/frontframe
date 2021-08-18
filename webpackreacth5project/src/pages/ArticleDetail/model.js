import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.articleDetail,
  state: {
    data: {
      content: [
        {
          type: 0,
          value: "不论是学习也好，还是思考也要，一定要回到第一原理。",
        },
        {
          type: 1,
          value: ["https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF", "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF", "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF"],
        },
        {
          type: 0,
          value: "现在很多人在提复杂系统、混沌理论，但其实世界仍然是简单的，仍然是存在第一原理的。你连简单的东西都没掌握，还妄想直接掌握复杂？"
        },
        {
          type: 1,
          value: ["https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF", "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF", "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF"],
        },
        {
          type: 0,
          value: "最近回到第一原理之后，感触很深，不论是学习也好，还是人性也好，其实本质很简单。掌握了第一原理，就能一通百通。"
        },
        {
          type: 1,
          value: ["https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF"],
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
