import React from "react";
import { connect } from "dva";
import { PAGE_CONFIG } from "../../utils/config";
import styles from "./index.less";
import BasePage from "../../bcomponents/BasePage";
import { Form, Button } from "antd";
import { FormCheckTree } from "../../components/FormItem";

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
      <Form>
        <FormCheckTree
          label="权限"
          decorate="permission"
          required={true}
          wrapperProps={{
            datas: [{
              name: '测试1',
              id: 1,
              children: [
                {
                  name: '测试2',
                  id: 2,
                  children: [
                    {
                      name: '测试3',
                      id: 3,
                    }
                  ]
                },
                {
                  name: '测试11',
                  id: 11
                },
                {
                  name: '测试12',
                  id: 12
                }
              ]
            }, {
              name: '测试4',
              id: 4,
              children: [
                {
                  name: '测试5',
                  id: 5,
                  children: [
                    {
                      name: '测试6',
                      id: 6,
                    },
                    {
                      name: '测试10',
                      id: 10,
                    }
                  ]
                },
                {
                  name: '测试7',
                  id: 7,
                  children: [
                    {
                      name: '测试8',
                      id: 8,
                    },
                    {
                      name: '测试9',
                      id: 9,
                    }
                  ]
                }, {
                  name: '测试13',
                  id: 13,
                  children: [
                    {
                      name: '测试14',
                      id: 14,
                      children: [
                        {
                          name: '测试17',
                          id: 17,
                        },
                        {
                          name: '测试18',
                          id: 18,
                          children: [
                            {
                              name: '测试19',
                              id: 19,
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: '测试15',
                      id: 15,
                    },
                    {
                      name: '测试16',
                      id: 16,
                    }
                  ]
                }
              ]
            }],
            isRecordPid: false
          }}
        />
        <Button htmlType="submit">提交</Button>
      </Form>
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