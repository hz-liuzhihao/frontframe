import InputLimit from '../../components/InputLimit';
import { FormComponentInfo } from '../form';
import { injectRules, FormItem } from '../FormItem/index';
import React from 'react';
/*
 * @Author: liuzhihao 
 * @Date: 2022-02-22 17:18:08 
 * @Last Modified by: liuzhihao
 * @Last Modified time: 2022-02-22 17:53:15
 */

interface FormInputPasswordProps extends BaseProps {
  info: FormComponentInfo;
}

/**
 * 输入密码组件
 * @param props 
 */
export function FormInputPassword(props: FormInputPasswordProps) {
  const { info } = props || {};
  const { compProps } = info || {};
  // 在这里将formcomp组件的属性拦截下来,remainProps是真正给非表单的组件的组件使用
  const { size = [], ...remainProps } = compProps || {};
  // 密码默认输入长度为5-30
  const min = size[0] || 5;
  const max = size[1] || 30;
  injectRules(info, [{
    min,
    message: `密码长度不能小于${min}位`
  }, {
    max,
    message: `密码长度不能大于${max}位`
  }]);
  return <FormItem info={info}>
    <InputLimit {...remainProps} maxLength={max} showTip={true} inputType="password" />
  </FormItem>
}