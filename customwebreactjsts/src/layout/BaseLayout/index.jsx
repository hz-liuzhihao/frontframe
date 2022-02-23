import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { BasicLayout, DefaultFooter, WaterMark } from '@ant-design/pro-layout';
import layoutConfig from '../../config/layoutConfig';
import { GLOBAL_CONFIG, PAGE_CONFIG } from '../../utils/config';
import { AppNavigator, filterMark } from '../../utils/common';
import { Dropdown, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  logout = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${GLOBAL_CONFIG.security}/logout`
    });
  }

  render() {
    const { children, pathname, userInfo } = this.props;
    const { navTheme, title, footer = {}, logo } = layoutConfig || {};
    const { links = [] } = footer || {};
    const { name, avatar } = userInfo || {};
    return (<div className={styles.baseLayout}>
      <BasicLayout
        navTheme={navTheme}
        title={title}
        logo={logo}
        footerRender={() => <DefaultFooter copyright={footer.title} links={links} />}
        menuItemRender={(item, dom) => {
          return <a onClick={() => AppNavigator.jump(item.path, true)}>
            {dom}
          </a>;
        }}
        rightContentRender={(props) => {
          return <Dropdown overlay={<Menu>
            <Menu.Item onClick={this.logout}>
              退出登录
            </Menu.Item>
          </Menu>}>
            <div className={styles.userInfo}>
              <Avatar shape="circle" srr={avatar} icon={<UserOutlined />} />
              <span style={{ marginLeft: '5px' }}>{name}</span>
            </div>
          </Dropdown>
        }}
        location={{ pathname }}
      >
        <WaterMark className={styles.pageContainer} content='交付管理系统'>
          {children}
        </WaterMark>
      </BasicLayout>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.baseLayout],
    userInfo: state[PAGE_CONFIG.securityLayout].userInfo,
    markMap: state[PAGE_CONFIG.securityLayout].markMap,
    breadcrumbs: state[GLOBAL_CONFIG.global].breadcrumbs,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(BaseLayout);
