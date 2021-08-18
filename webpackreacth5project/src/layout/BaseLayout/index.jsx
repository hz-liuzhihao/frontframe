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
      <div className={styles.appContainer}>
        <div className={styles.appCation}>
          <img className={styles.appImg} src="http://image.xingqinghao.com/img/xqh.png" />
          <span className={styles.appName}>性情好</span>
        </div>
        <button className={styles.openApp}>打开APP</button>
      </div>
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