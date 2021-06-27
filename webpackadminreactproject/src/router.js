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

  // 第二个页面
  const Second = dynamic({
    app,
    component: () => require.ensure([], (require) => require('./pages/Second')),
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
    component: () => require.ensure([], (require) => require('./pages/Wrap')),
    models: () => [
      require.ensure([], (require) => require('./pages/Wrap/model')),
    ],
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
        <Route path={NotLoginConfig.login} component={LoginPage} />
        <Route path={NotLoginConfig.second} component={Second} />
        <Route path={NotLoginConfig.notFound} component={NotFound} />
        <Route
          path="/security"
          component={() => (
            <SecurityLayout>
              <Switch>
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
                  <Route path="/" exact component={Wrap} />
                  <Route path="/sysconfig/managedict" component={Home} />
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
