import {connect} from 'dva';

import { PureComponent } from "react";
import { GLOBAL_CONFIG } from '../../utils/config';

class Login extends PureComponent {

  render() {
    return <div>测试打包</div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[GLOBAL_CONFIG.security],
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Login);