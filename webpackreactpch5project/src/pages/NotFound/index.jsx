import React from 'react';
import { Result, Button } from 'antd';
import { AppNavigator } from '../../utils/common';

/**
 * 404页面
 * @param {*} props 
 * @returns 
 */
export default function NotFound(props) {
  return <Result
    status="404"
    title="404"
    subTitle="对不起，你访问的页面不存在"
    extra={<Button type="primary" onClick={() => {
      AppNavigator.jump('/', true);
    }} >返回主页</Button>}
  />
}