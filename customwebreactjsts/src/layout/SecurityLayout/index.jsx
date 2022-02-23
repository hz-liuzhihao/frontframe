import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_CONFIG } from '../../utils/config';
import Login from '../../bcomponents/Login';

/**
 * 基础布局
 */
class SecurityLayout extends PureComponent {

  render() {
    const { children, needLogin } = this.props;
    return (
    <div className={styles.security}>
      {<div style={{ display: needLogin ? 'flex' : 'none' }} className={styles.loginContainer}>
        <Login />
      </div>}
      {children}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.securityLayout],
    loading: state.loading
  }
}

export default connect(mapStateToProps)(SecurityLayout);
