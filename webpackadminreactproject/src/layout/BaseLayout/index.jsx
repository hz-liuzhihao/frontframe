import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { Menu } from 'antd';
import { BasicLayout, DefaultFooter } from '@ant-design/pro-layout';
import layoutConfig from '../../config/layoutConfig';
import { PAGE_CONFIG } from '../../utils/config';
import menuConfig from '../../config/menuConfig';
import { AppNavigator } from '../../utils/common';

const { SubMenu, Item } = Menu;

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children, pathname } = this.props;
    const { navTheme, title, footer = {} } = layoutConfig || {};
    const { links = [] } = footer || {};
    return (<div className={styles.baseLayout}>
      <BasicLayout
        navTheme={navTheme}
        title={title}
        footerRender={() => <DefaultFooter copyright={footer.title} links={links} />}
        menuDataRender={() => {
          return menuConfig;
        }}
        menuItemRender={(item, dom) => {
          return <a onClick={() => AppNavigator.jump(item.path, true)}>
            {dom}
          </a>
        }}
        location={{ pathname }}
      >
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