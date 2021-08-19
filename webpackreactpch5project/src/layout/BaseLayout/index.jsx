import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import styles from './index.less';
import { showMessage } from '../../components/Message';

/**
 * 基础布局
 */
class BaseLayout extends PureComponent {

  render() {
    const { children, activeIndex } = this.props;
    return (<div className={styles.container}>
      <nav className="navbar navbar-inverse" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            <img src="http://image.xingqinghao.com/img/xqh.png" style={{ display: 'inline-block', width: '40px', height: '40px' }} />
            性情好
          </a>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#menu">
            <span className="sr-only">展开导航</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="nav navbar-nav">
            <li className={activeIndex == 0 ? 'active' : ''}><a href="#/">首页</a></li>
            <li className={activeIndex == 1 ? 'active' : ''} ><a href="#/aboutxqh">关于我们</a></li>
            <li className={activeIndex == 2 ? 'active' : ''}><a href="#/concatxqh">联系我们</a></li>
          </ul>
        </div>
      </nav>
      {children}
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className={styles.footer}>
          <div>
            <div className={styles.btnContainer}>
              <a href="http://image.xingqinghao.com/xqh/app/android/0.0.1/app.apk" download="性情好.apk"><button className={styles.customBtn} style={{ marginRight: "10px" }} type="submit"><span className="glyphicon glyphicon-phone" style={{ marginRight: '5px' }} aria-hidden="true"></span>Android</button></a>
              <button className={styles.customBtn} onClick={() => {
                showMessage("暂未发布苹果平台")
              }} type="submit"><span className="glyphicon glyphicon-phone" style={{ marginRight: '5px' }} aria-hidden="true"></span>Iphone</button>
            </div>
          </div>
          <div className={styles.companyInfo}>Copyright © 2016-2021 杭州发淘网络科技有限公司</div>
          <div className={styles.record}>浙ICP备2021023786号 违法不良信息投诉举报</div>
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