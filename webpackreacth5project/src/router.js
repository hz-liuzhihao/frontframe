import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import { NotLoginConfig } from "../config/notLoginConfig";
import NotFound from "./pages/NotFound";
import 'antd/dist/antd.css';

function RouterConfig({ history, app }) {
  // 主页
  const ArticleDetail = dynamic({
    app,
    component: () => require.ensure([], (require) => require("./pages/ArticleDetail")),
  });

  // 第二个页面
  const GoodDetail = dynamic({
    app,
    component: () => require.ensure([], (require) => require("./pages/GoodDetail")),
  });

  // 基础布局
  const BaseLayout = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require("./layout/BaseLayout")),
  });

  // 基础布局下的页面
  const Wrap = dynamic({
    app,
    component: () => require.ensure([], (require) => require("./pages/Wrap")),
  });

  // 权限布局下的页面
  const SecurityLayout = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require("./layout/SecurityLayout")),
  });

  // 需要登录的页面
  const NeedLogin = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require("./pages/NeedLogin")),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path={NotLoginConfig.notFound} component={NotFound} />
        <Route
          path="/"
          component={() => (
            <BaseLayout>
              <Switch>
                <Route path="/article/detail" component={ArticleDetail} />
                <Route path="/good/detail" component={GoodDetail} />
                <Redirect from="/*" to="/notfound" />
              </Switch>
            </BaseLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
