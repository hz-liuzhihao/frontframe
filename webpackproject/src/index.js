import dva from 'dva';
import * as dd from 'dingtalk-jsapi';
import './index.css';
import {
  getUrlParam
} from './utils/common';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

(async function () {
  const corpId = getUrlParam('corpId');
  await dd.runtime.permission.requestAuthCode({
    corpId,
    onFail: function (err) {
      console.log(err);
    },
    onSuccess: function (res) {
      console.log(JSON.stringify(res));
    }
  })
})()

// 5. Start
app.start('#root');
