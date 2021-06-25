import React, { PureComponent } from 'react';
import { FormCropperUpload, FormInputLimit, FormCasSelect } from '../../components/FormItem';
import { Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';

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

  doSearch = (value, dictKey, parentValue) => {
    console.log('onsearch', value, dictKey, parentValue);
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
          wrapperProps={{
            maxLength: 30,
            showTip: false,
          }}
        />
        <FormInputLimit
          decorate="name"
          label="姓名"
          wrapperProps={{
            inputType: 'textarea',
            autoSize: true,
            allowClear: true,
          }}
        />
        <FormInputLimit
          decorate="password"
          label="密码"
          wrapperProps={{
            inputType: 'password',
            allowClear: true
          }}
        />
        <FormCasSelect
          label="城市"
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
      </Form>
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