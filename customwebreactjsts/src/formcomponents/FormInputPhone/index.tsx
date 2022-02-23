/*
 * @Author: liuzhihao 
 * @Date: 2022-02-22 17:18:17 
 * @Last Modified by: liuzhihao
 * @Last Modified time: 2022-02-22 17:54:27
 */
import { FormComponentInfo } from '../form';
import { FormItem } from '../FormItem';
import React from 'react';
import { injectRules } from '../FormItem/index';
import InputLimit from '../../components/InputLimit';


interface FormInputPhoneProps extends BaseProps {
  info: FormComponentInfo;
}

/**
 * 手机号表单组件
 * @param props 
 */
export default function FormInputPhone(props: FormInputPhoneProps) {
  const { info } = props || {};
  const { compProps } = info || {};
  const { size, ...remainProps } = compProps;
  injectRules(info, [{
    pattern: '^[1][3,5,7,8][0-9]\\d{8}$' as any, // 这个是antd自己的接口定义问题,必须是string而不是Regex
    message: '手机号码格式不正确'
  }]);
  return <FormItem info={info}>
    <InputLimit {...remainProps} maxLength={11} showTip={true} />
  </FormItem>
}