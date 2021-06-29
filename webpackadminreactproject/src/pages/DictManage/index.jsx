import React from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import BasePage from "../../bcomponents/BasePage";

/**
 * 权限管理页面
 */
class DictManage extends BasePage {

  constructor(props) {
    super(props);
  }

  getTitle() {
    return '字典管理';
  }

  render() {
    return <div className={styles.dictContainer}>
      字典管理
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.dictManage],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(DictManage);
