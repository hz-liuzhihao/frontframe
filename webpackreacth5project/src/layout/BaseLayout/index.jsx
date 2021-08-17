import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import styles from './index.less';

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children } = this.props;
    return (<div className={styles.container}>
      {children}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.baseLayout],
    loading: state.loading
  }
}

export default connect(mapStateToProps)(BaseLayout);