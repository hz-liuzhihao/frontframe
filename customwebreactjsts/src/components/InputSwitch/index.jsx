import React from 'react';
import { Switch } from 'antd';

/**
 * 对Switch组件进行包装
 * @param {*} props 
 */
export default function InputSwitch(props) {
  let { value } = props;
  if (value == 1) value = true;
  if (value == 0) value = false;
  return <Switch {...props} checked={value} />
}
