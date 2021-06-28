import React, { PureComponent } from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import RecursiveEdit from "../../components/RecursiveEdit";
import { ClusterOutlined, ProfileOutlined } from "@ant-design/icons";

/**
 * 权限管理页面
 */
class PermissionManage extends PureComponent {

  constructor(props) {
    super(props);
  }

  /**
   * 跳转
   */
  jump = (item) => {
    console.log('跳转')
    console.log(item);
  }

  doEdit = (item) => {
    console.log('编辑');
    console.log(item);
  }

  doDel = (item) => {
    console.log('删除');
    console.log(item);
  }

  /**
   * 渲染元素
   * @param {*} item 
   */
  renderItem = (item) => {
    const { name, remark, type } = item || {};
    return <>
      {type == 'menu' ? <ClusterOutlined className={styles.itemIcon} /> : <ProfileOutlined className={styles.itemIcon} />}
      <p className={styles.itemTitle}>{name}</p>
      <p className={styles.itemSubTitle}>{remark}</p>
    </>
  }

  /**
   * 添加
   */
  add = () => {
    console.log('添加')
  }

  render() {
    return <div className={styles.perContainer}>
      <RecursiveEdit
        paths={[
          {
            id: 10,
            type: 'menu',
            name: '测试',
            remark: '测试预览',
          }, {
            id: 11,
            type: 'menu',
            name: '测试2',
            remark: '测试预览2',
          }
        ]}
        datas={[{
          id: 10,
          type: 'menu',
          name: '测试',
          remark: '测试预览',
        }, {
          id: 11,
          type: 'menu',
          name: '测试2',
          remark: '测试预览2',
        }, {
          id: 12,
          type: 'menu',
          name: '测试3',
          remark: '测试预览3',
        }, {
          id: 13,
          type: 'menu',
          name: '测试4',
          remark: '测试预览4',
        }, {
          id: 11,
          type: 'menu',
          name: '测试2',
          remark: '测试预览2',
        }, {
          id: 12,
          type: 'menu',
          name: '测试3',
          remark: '测试预览3',
        }, {
          id: 13,
          type: 'menu',
          name: '测试4',
          remark: '测试预览4',
        }]}
        jump={this.jump}
        renderItem={this.renderItem}
        onEdit={this.doEdit}
        onDel={this.doDel}
      />
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.permissionManage],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(PermissionManage);