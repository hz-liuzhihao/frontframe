/*
 * @Author: liuzhihao 
 * @Date: 2022-02-22 16:42:05 
 * @Last Modified by: liuzhihao
 * @Last Modified time: 2022-02-22 18:09:30
 * 1. 负责二次封装antd的Form.Item供表单引擎使用;
 * 2. 负责提供注入的表单属性。
 */
import { Form } from 'antd';
import { Rule, RuleObject } from 'antd/lib/form';
import { FormComponentInfo } from '../form';
import React from 'react';

interface FormItemProps extends BaseProps {
  // 表单组件信息
  info: FormComponentInfo;
}

/**
 * 表单form.item的高阶组件,FormItem只解析自己的表单的属性
 * @param props 
 */
export function FormItem(props: FormItemProps) {
  const { fromProps, key, label, initialValue, rules, isRequire } = props.info || {};
  const isRequireRule = rules.findIndex((item) => (item as RuleObject).required == true) > -1;
  return <Form.Item {...fromProps} name={key} key={key} initialValue={initialValue} validateFirst label={label} rules={rules} required={isRequire || isRequireRule}>
    {props.children}
  </Form.Item>
}

/**
 * 注入表达规则属性
 * @param info 
 */
export function injectRules(info: FormComponentInfo, rules: Rule[]) {
  if (!info.rules) {
    info.rules = [];
  }
  const isRequireRule = info.rules.findIndex((item) => (item as RuleObject).required == true) > -1;
  if (info.isRequire && !isRequireRule) {
    info.rules.push({
      required: true,
      message: `${info.label}不能为空`
    });
  }
  info.rules.push(...rules);
  return info;
}