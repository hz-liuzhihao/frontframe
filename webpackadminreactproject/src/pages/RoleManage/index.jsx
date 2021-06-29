import React from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import ProTable from "@ant-design/pro-table";
import { Button } from "antd";
import { AppNavigator } from "../../utils/common";
import BasePage from "../../bcomponents/BasePage";

/**
 * 权限管理页面
 */
class RoleManage extends BasePage {

  constructor(props) {
    super(props);
  }

  getTitle() {
    return '角色管理';
  }

  getColumns = () => {
    return [{
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    }, {
      title: '描述',
      dataIndex: 'remark',
      ellipsis: true
    }, {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => {
        return <>
          <a>
            编辑
          </a>
          <a>
            查看
          </a>
          <a>
            删除
          </a>
        </>
      }
    }];
  }

  doAdd = () => {
    AppNavigator.jump('/sysconfig/rolemanage/edit?mode=add')
  }

  render() {
    return <div className={styles.roleContainer}>
      <ProTable
        columns={this.getColumns()}
        rowKey="id"
        headerTitle="角色管理"
        columnEmptyText="无"
        toolBarRender={() => {
          return <>
            <Button type='primary' onClick={this.doAdd}>
              新建
            </Button>
          </>;
        }}
      />
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