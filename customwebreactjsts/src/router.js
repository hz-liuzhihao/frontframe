import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import NotFound from './pages/NotFound';
import { NotLoginConfig } from './config/notLoginConfig';
import { LoginPage } from './pages/LoginPage';

function RouterConfig({ history, app }) {
  // 主页
  const Home = dynamic({
    app,
    component: () => require.ensure([], (require) => require('./pages/Home')),
  });

  // 基础布局
  const BaseLayout = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require('./layout/BaseLayout')),
    models: () => [
      require.ensure([], (require) => require('./layout/BaseLayout/model')),
    ],
  });

  // 基础布局下的页面
  const Wrap = dynamic({
    app,
    component: () => require.ensure([], (require) => require('./pages/Wrap'))
  });

  // 权限布局下的页面
  const SecurityLayout = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require('./layout/SecurityLayout')),
    models: () => [
      require.ensure([], (require) => require('./layout/SecurityLayout/model')),
    ],
  });

  // 需要登录的页面
  const NeedLogin = dynamic({
    app,
    component: () =>
      require.ensure([], (require) => require('./pages/NeedLogin')),
  });
  return (
    <Router history={history}>
      <Switch>
        {/* 不需要授权的页面,如运营页面,推广页面 */}
        <Route path={NotLoginConfig.login} exact component={LoginPage} />
        <Route path={NotLoginConfig.notFound} component={NotFound} />
        <Route path={NotLoginConfig.second} component={Home}/>
        <Route
          path="/security"
          component={() => (
            <SecurityLayout>
              <Switch>
                {/* 非基础布局但需要登录的页面 */}
                <Route path="/security/needlogin" component={NeedLogin} />
                <Redirect from="/*" to="/notfound" />
              </Switch>
            </SecurityLayout>
          )}
        />
        <Route
          path="/"
          component={() => (
            <SecurityLayout>
              <BaseLayout>
                <Switch>
                  {/* 包含基础布局且需要登录的页面 */}
                  <Route path="/" exact component={Wrap} />
                  <Redirect from="/*" to="/notfound" />
                </Switch>
              </BaseLayout>
            </SecurityLayout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
