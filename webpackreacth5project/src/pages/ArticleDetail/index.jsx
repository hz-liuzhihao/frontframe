import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import styles from './index.less';

/**
 * 主页
 */
function ArticleDetail(props) {
  return (<div className={styles.container}>
    主页
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.articleDetail],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(ArticleDetail);