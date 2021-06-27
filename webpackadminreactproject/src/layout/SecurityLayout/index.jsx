import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import styles from './index.less';
import { PAGE_CONFIG } from '../../utils/config';
import Login from '../../bcomponents/Login';

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children } = this.props;
    return (<div className={styles.security}>
      <Modal>
        <Login />
      </Modal>
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

export default connect(mapStateToProps)(BaseLayout);