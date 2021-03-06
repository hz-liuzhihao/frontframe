import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { BasicLayout, DefaultFooter, WaterMark } from '@ant-design/pro-layout';
import layoutConfig from '../../config/layoutConfig';
import { GLOBAL_CONFIG, PAGE_CONFIG } from '../../utils/config';
import menuConfig from '../../config/menuConfig';
import { AppNavigator } from '../../utils/common';
import { Breadcrumb } from 'antd';

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children, pathname, breadcrumbs = [], title: lastTitle = '' } = this.props;
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
        <WaterMark className={styles.pageContainer} content='刘志豪管理端框架'>
          {children}
        </WaterMark>
      </BasicLayout>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.baseLayout],
    breadcrumbs: state[GLOBAL_CONFIG.global].breadcrumbs,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(BaseLayout);