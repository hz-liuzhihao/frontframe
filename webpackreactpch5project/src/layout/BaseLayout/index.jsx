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
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img src="http://image.xingqinghao.com/img/xqh.png" style={{ display: 'inline-block', width: '40px', height: '40px' }} />
            性情好
          </a>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span class="sr-only">展开导航</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="menu">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">首页</a></li>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">联系我们</a></li>
          </ul>
        </div>
      </nav>
      {children}
      <nav class="navbar navbar-default navbar-fixed-bottom">
        <div className={styles.footer}>
          <div>
            <div>
              <button class="btn btn-default" style={{marginRight: "10px"}} type="submit"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span>Iphone</button>
              <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span>Android</button>
            </div>
          </div>
          <div>Copyright © 2012-2021 厦门海豹他趣信息技术股份有限公司</div>
          <div>闽ICP备12008757号-3 闽网文[2018]8298-373号 违法不良信息投诉举报</div>
        </div>
      </nav>
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