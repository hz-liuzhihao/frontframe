import dva from "dva";
import createLoading from "dva-loading";
import { createLogger } from "redux-logger";
import undoable, { ActionCreators } from "redux-undo";
import "./index.css";

window.addEventListener("message", function (e) {
  console.log(e);
});

/**
 * 初始化dva数据流框架
 * 1. 错误捕获
 * 2. 支持action日志
 * 3. 支持reducer的redo/undo
 */
const app = dva({
  onError: (e) => {
    console.log("捕捉错误" + e.message);
  },
  onAction: createLogger({}),
  onReducer: (reducer) => {
    return (state, action) => {
      const undoOpts = {};
      const newState = undoable(reducer, undoOpts)(state, action);
      // 由于 dva 同步了 routing 数据，所以需要把这部分还原
      return { ...newState, routing: newState.present.routing };
    };
  },
});

// 初始化dva插件
app.use(createLoading());

// 初始化全局数据层
app.model(require("./models/global").default);

// 初始化全局路由
app.router(require("./router").default);

// 启动
app.start("#root");
