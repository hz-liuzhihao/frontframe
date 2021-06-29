import React from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import BasePage from "../../bcomponents/BasePage";

/**
 * 权限管理页面
 */
class RoleEdit extends BasePage {

  constructor(props) {
    super(props);
  }

  getTitle() {
    return '编辑';
  }

  render() {
    return <div className={styles.perContainer}>
      角色编辑
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.roleEdit],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(RoleEdit);