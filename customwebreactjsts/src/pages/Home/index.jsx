import React from 'react';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import { FormEngine } from "../../formcomponents";

/**
 * 主页
 */
function Home(props) {
  return (<div>
    <FormEngine />
  </div>);
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.home],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Home);
