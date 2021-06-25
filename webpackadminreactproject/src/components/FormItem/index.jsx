import React from 'react';
import { Form } from 'antd';
import CropperImageUpload from '../CropperImageUpload';
import InputLimit from '../InputLimit';

/**
 * 表单包装器
 * @param {*} Wrapper 
 * @param {*} args 
 * @returns 
 */
export function FormWrapper(Wrapper, args) {
  return function (props) {
    const { } = args || {};
    const { decorate, wrapperProps = {}, rules = [], initialValue, children, required, requiredMessage, label } = props;
    return <Form.Item name={decorate} initialValue={initialValue} rules={[
      {
        required: required,
        message: requiredMessage || `${label}不能为空`
      },
      ...rules
    ]} validateFirst label={label}>
      <Wrapper {...wrapperProps}>
        {children}
      </Wrapper>
    </Form.Item>
  }
}

/**
 * 上传图片表单组件
 */
export const FormCropperUpload = FormWrapper(CropperImageUpload);

/**
 * 输入表单组件
 */
export const FormInputLimit = FormWrapper(InputLimit);