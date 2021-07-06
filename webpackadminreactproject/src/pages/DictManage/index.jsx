import React from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import BasePage from "../../bcomponents/BasePage";
import ProTable from "@ant-design/pro-table";
import { Button, Modal, Form } from "antd";
import { FormInputLimit } from "../../components/FormItem";

/**
 * 权限管理页面
 */
class DictManage extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      curItem: {},
      modalVisible: false
    };
    this.formRef = React.createRef();
  }

  getTitle() {
    return '字典管理';
  }

  getColumns = () => {
    return [{
      title: 'key',
      dataIndex: 'id'
    }, {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    }, {
      title: '描述',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true
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

  /**
   * 新增字典
   */
  doAdd = () => {
    this.setState({
      modalVisible: true,
      isEdit: false
    });
  }

  operateDict = () => {
    const { isEdit } = this.state;
    const { current } = this.formRef;
    current?.validateFields().then(values => {
      console.log(values);
    }).catch(err => {
      console.log(err);
    });
  }

  /**
   * 取消操作
   */
  doCancel = () => {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    const { modalVisible, isEdit } = this.state;
    return <div className={styles.dictContainer}>
      <Modal
        title={`${isEdit ? '编辑' : '新增'}字典`}
        visible={modalVisible}
        onOk={this.operateDict}
        onCancel={this.doCancel}
      >
        <Form ref={this.formRef}>
          <FormInputLimit
            decorate="key"
            required
            label="标识符"
            wrapperProps={{
              maxLength: 10,
              showTip: true
            }}
          />
          <FormInputLimit
            decorate="name"
            label="名称"
            wrapperProps={{
              maxLength: 20,
              showTip: true
            }}
            required
          />
          <FormInputLimit
            decorate="remark"
            label="描述"
            wrapperProps={{
              inputType: 'textarea',
              maxLength: 50,
              showTip: true
            }}
          />
        </Form>
      </Modal>
      <ProTable
        columns={this.getColumns()}
        rowKey="id"
        headerTitle="字典管理"
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
    ...state[PAGE_CONFIG.dictManage],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(DictManage);
