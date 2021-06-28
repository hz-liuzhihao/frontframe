import React, { PureComponent } from 'react';
import { FormCropperUpload, FormInputLimit, FormCasSelect, FormPhone, FormVeriCode } from '../../components/FormItem';
import { Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';
import { MenuOutlined, PhoneOutlined } from '@ant-design/icons';
import RecursiveEdit from '../../components/RecursiveEdit';
import { ClusterOutlined, ProfileOutlined } from '@ant-design/icons';

class Wrap extends PureComponent {

  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  doChange = (parentValue, dictKey) => {
    console.log('onchange', parentValue, dictKey);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          label: '湖北',
          value: 'hb'
        }, {
          label: '浙江',
          value: 'zj'
        }])
      }, 1000);
    })
  }

  doGetVerCode = () => {
    return Promise.resolve(true);
  }

  doSearch = (value, dictKey, parentValue) => {
    console.log('onsearch', value, dictKey, parentValue);
  }

  /**
   * 跳转
   */
  jump = () => {

  }

  /**
   * 渲染元素
   * @param {*} item 
   */
  renderItem = (item) => {
    const { name, remark, type } = item || {};
    return <>
      {type == 'menu' ? <ClusterOutlined /> : <ProfileOutlined />}
      <span>{name}</span>
      <span>{remark}</span>
    </>
  }

  /**
   * 添加
   */
  add = () => {

  }

  render() {
    const { form } = this.props;
    return <div>
      <Form
        name="basic"
        ref={this.form}
      >
        <FormCropperUpload
          decorate="img"
          required
          wrapperProps={{
            isCrop: true,
            placeholder: "建议200x200大小",
            multiple: true,
            listType: "picture-card"
          }}
        >
          上传文件
        </FormCropperUpload>
        <FormInputLimit
          decorate="sex"
          label="性别"
          required
          wrapperProps={{
            maxLength: 30,
            showTip: false,
          }}
        />
        <FormInputLimit
          decorate="name"
          label="姓名"
          required
          wrapperProps={{
            inputType: 'textarea',
            autoSize: true,
            allowClear: true,
          }}
        />
        <FormInputLimit
          decorate="password"
          label="密码"
          required
          wrapperProps={{
            inputType: 'password',
            allowClear: true
          }}
        />
        <FormCasSelect
          label="城市"
          required
          formRef={this.form}
          metaDatas={[
            {
              decorate: 'province',
              required: true,
              dictKey: 'province',
              wrapperProps: {
                showSearch: true,
              },
            },
            {
              decorate: 'city',
              required: true,
              dictKey: 'city',
              wrapperProps: {
                showSearch: true,
              },
            },
            {
              decorate: 'district',
              required: true,
              dictKey: 'district',
              wrapperProps: {
                showSearch: true,
              },
            }
          ]}
          onChange={this.doChange}
          onSearch={this.doSearch}

        />
        <FormPhone
          required
          decorate="phone"
          wrapperProps={{
            allowClear: true,
            bordered: false,
            singleBorder: true
          }}
        />
        <FormPhone
          required
          decorate="phone2"
          wrapperProps={{
            allowClear: true,
            bordered: false,
            singleBorder: true,
            prefix: <PhoneOutlined />,
            suffix: <div>获取验证码</div>
          }}
        />
        <FormVeriCode
          required
          decorate="vericode"
          wrapperProps={{
            onGetVerCode: this.doGetVerCode,
            allowClear: true,
            bordered: false,
            singleBorder: true,
            size: 'large'
          }}
        />
      </Form>
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
        }]}
        jump={this.jump}
        renderItem={this.renderItem}
      />
    </div>
  }
}

function mapStateToProps(state) {
  return {
    ...state[PAGE_CONFIG.wrap],
    loading: state.loading
  };
}

export default connect(mapStateToProps)(Wrap);