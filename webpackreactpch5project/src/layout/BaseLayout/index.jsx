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
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span class="sr-only">展开导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">网站标题</a>
        </div>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">首页</a></li>
            <li><a href="#">导航标题1</a></li>
            <li><a href="#">导航标题2</a></li>
            <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">下拉菜单 <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">下拉菜单1</a></li>
                <li class="divider"></li>
                <li><a href="#">下拉菜单2</a></li>
                <li class="divider"></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
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