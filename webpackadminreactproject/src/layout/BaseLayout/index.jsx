import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Menu } from 'antd';
import { BasicLayout } from '@ant-design/pro-layout';
import { PAGE_CONFIG } from '../../utils/config';

const { SubMenu, Item } = Menu;

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children } = this.props;
    return (<div className={styles.baseLayout}>
      <BasicLayout>
        {children}
      </BasicLayout>
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