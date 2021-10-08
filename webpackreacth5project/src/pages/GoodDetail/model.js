import { PAGE_CONFIG } from "../../utils/config";

export default {
  namespace: PAGE_CONFIG.goodDetail,
  state: {
    data: {
      skuId: 1,
      unitPrice: 20,
      materialUrl:
        "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
      endDate: 1631082775382,
      isFreeFreightRisk: 0,
      isFreeShipping: 0,
      // 无线佣金比例
      commisionRatioWl: 0.5,
      // pc佣金比例
      commisionRatioPc: 0.5,
      imgUrl: "https://t7.baidu.com/it/u=2604797219,1573897854&fm=193&f=GIF",
      vid: "",
      // 类目名称
      cidName: "测试",
      // 无线单价
      wlUnitPrice: 20,
      // 二级类目名称
      cid2Name: "测试",
      isSeckill: 0,
      // 二级类目id
      cid2: 234,
      // 三级类目名称
      cid3Name: "三级类目",
      inOrderCount: 234,
      cid3: 456,
      // 店铺id
      shopId: 98345,
      // 是否京东自营
      isJdSale: 0,
      goodsName: "测试",
      startDate: 1631082775382,
      // 一级类目id
      cid: 345,
      skuName: "测试sku",
      categoryInfo: {},
      mageInfo: {},
      baseBigFieldInfo: {},
      bookBigFieldInfo: {},
      videoBigFieldInfo: {},
      mainSkuId: 2948923,
      productId: 9283434,
      skuStatus: 1,
      owner: "是",
      detailImages: "[]",
      isCoupon: 1,
      couponLink: "",
      couponDiscount: 10,
      couponQuota: 234,
      couponRemainCnt: 234,
      goodCommentsShare: 95.5,
      goodComments: 10000,
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
      relatedProducts: "相关商品",
      productFeatures: "产品特色",
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
