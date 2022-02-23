/*
 * @Author: liuzhihao 
 * @Date: 2022-02-22 18:03:51 
 * @Last Modified by: liuzhihao
 * @Last Modified time: 2022-02-22 18:13:06
 */

import InputSwitch from '../../components/InputSwitch';
import { FormComponentInfo } from '../form';
import { FormItem } from '../FormItem';
import React from 'react';
import { injectRules } from '../FormItem/index';

interface FormInputSwitchProps extends BaseProps {
  info: FormComponentInfo;
}

/**
 * 开关表单组件
 * @param props 
 * @returns 
 */
export default function FormInputSwitch(props: FormInputSwitchProps) {
  const { info } = props || {};
  const { compProps } = info || {};
  if (info.initialValue == null) {
    info.initialValue = 0;
  }
  injectRules(info, []);
  return <FormItem info={info}>
    <InputSwitch {...compProps} />
  </FormItem>;
}