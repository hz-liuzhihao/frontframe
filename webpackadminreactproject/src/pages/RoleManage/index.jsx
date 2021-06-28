import React, { PureComponent } from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";

/**
 * 权限管理页面
 */
class RoleManage extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return <div className={styles.perContainer}>
      角色管理
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.roleManage],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(RoleManage);