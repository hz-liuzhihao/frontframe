import React, { PureComponent } from 'react';
import { FormCropperUpload, FormInputLimit } from '../../components/FormItem';
import { Form, Input } from 'antd';
import { connect } from 'dva';
import { PAGE_CONFIG } from '../../utils/config';

class Wrap extends PureComponent {

  constructor(props) {
    super(props);
    this.form = React.createRef();
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
        />
        <FormInputLimit
          decorate="name"
          wrapperProps={{
            inputType: 'textarea',
            autoSize: true,
            allowClear: true
          }}
        />
        <FormInputLimit
          decorate="password"
          wrapperProps={{
            inputType: 'password',
            autoSize: true,
            allowClear: true
          }}
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