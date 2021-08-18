import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.goodDetail,
  state: {
    data: {
      skuId: 234234,
      skuName: "商品",
      categoryName: "",
      imageList: [
        "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
        "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
      ],
      propCode: "12片*3盒",
      wareQD: "纸质包装",
      comments: "这很好",
      image: "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
      contentDesc: "简介",
      relatedProducts: '相关商品',
      productFeatures: '产品特色',
      authorDesc: "作者简介",
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
