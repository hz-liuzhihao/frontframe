import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';

/**
 * 需要登录的页面
 */
function NeedLogin(props) {
  return (<div onClick={() => console.log('测试')}>
    必须用户登录
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.needLogin],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(NeedLogin);