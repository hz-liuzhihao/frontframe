import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import Excel from '../../components/Excel';

/**
 * 主页
 */
function Home(props) {
  return (<div style={{ width: '100%', height: '100%' }}>
    <Excel />
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.home],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Home);