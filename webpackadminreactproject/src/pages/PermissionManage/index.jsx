import React, { PureComponent } from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";

/**
 * 权限管理页面
 */
class PermissionManage extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>权限管理页面</div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.permissionManage],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(PermissionManage);