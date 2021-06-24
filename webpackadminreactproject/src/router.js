import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

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
        <Route path="/login" component={Home} />
        <Route path="/second" component={Second} />
        <Route
          path="/security"
          component={() => (
            <SecurityLayout>
              <Switch>
                <Route path="/security/needlogin" component={NeedLogin} />
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
