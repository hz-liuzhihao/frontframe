import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import CropperImageUpload from '../CropperImageUpload';

/**
 * 上传图片表单组件
 */
export class FormCropperUpload extends PureComponent {

  static propsTypes = {
    decorate: PropTypes.string,
    required: PropTypes.bool,
    imgProps: PropTypes.object,
    rules: PropTypes.array,
    initialValue: PropTypes.any,
    label: PropTypes.string,
  }

  render() {
    const { decorate, imgProps, rules = [], initialValue, children, required, label } = this.props;
    return <Form.Item initialValue={initialValue} name={decorate} rules={[
      {
        required: required,
        message: '图片必须上传'
      },
      ...rules
    ]} validateFirst label={label}>
      <CropperImageUpload {...imgProps}>{children}</CropperImageUpload>
    </Form.Item>;
  }
}