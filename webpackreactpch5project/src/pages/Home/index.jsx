import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import Qrcode from 'qrcode.react';
import styles from './index.less';

/**
 * 主页
 */
function Home(props) {
  return (<div className={styles.container}>
    <div className="col-xs-12 col-sm-12 col-md-offset-3 col-md-3 col-lg-offset-3 col-lg-3" style={{ marginTop: '50px' }}>
      <div className={styles.qrCodeContainer}>
        <Qrcode style={{ width: '160px', height: '160px' }} imageSettings={{
          src: "http://image.xingqinghao.com/img/xqh.png",
          height: 16,
          width: 16
        }} value="http://image.xingqinghao.com/xqh/app/android/0.0.1/app.apk" bgColor="rgba(0,0,0,0)" fgColor="#ff4d4f" />
        <div className={styles.qrCaption}>Android下载二维码</div>
      </div>
    </div>
    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{ marginTop: '50px' }}>
      <div className={styles.qrCodeContainer}>
        <Qrcode style={{ width: '160px', height: '160px' }} imageSettings={{
          src: "http://image.xingqinghao.com/img/xqh.png",
          height: 16,
          width: 16
        }} value="https://www.apple.com.cn/app-store/" bgColor="rgba(0,0,0,0)" fgColor="#ff4d4f" />
        <div className={styles.qrCaption}>Iphone下载二维码</div>
      </div>
    </div>
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.home],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Home);