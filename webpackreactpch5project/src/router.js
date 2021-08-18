import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import dynamic from "dva/dynamic";
import { NotLoginConfig } from "../config/notLoginConfig";
import NotFound from "./pages/NotFound";

function RouterConfig({ history, app }) {
  // 主页
  const Home = dynamic({
    app,
    component: () => require.ensure([], (require) => require("./pages/Home")),
  });

  // 第二个页面
  const Second = dynamic({
    app,
    component: () => require.ensure([], (require) => require("./pages/Second")),
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
        {/* <Route path="/" exact component={Home} />
        <Route path={NotLoginConfig.notFound} component={NotFound} />
        <Route path="/second" component={Second} />
        <Route />
        <Route
          path="/security"
          component={() => (
            <SecurityLayout>
              <Switch>
                <Route path="/security/needlogin" component={NeedLogin} />
              </Switch>
            </SecurityLayout>
          )}
        /> */}
        <Route
          path="/"
          component={() => (
            <BaseLayout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/good/detail" component={Wrap} />
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
