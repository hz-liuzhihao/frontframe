import dva from "dva";
import createLoading from "dva-loading";
import { createLogger } from "redux-logger";
import 'antd/dist/antd.css';
import '@ant-design/pro-layout/dist/layout.css';
import "./index.css";

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
  onAction: createLogger({})
});

// 初始化dva插件
app.use(createLoading());

// 初始化全局数据层
app.model(require("./models/global").default);

// 初始化全局路由
app.router(require("./router").default);

// 启动
app.start("#root");
