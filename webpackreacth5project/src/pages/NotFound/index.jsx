import React from 'react';
import { Result, Button } from 'antd';
import { AppNavigator } from '../../utils/common';
import styles from './index.less';

/**
 * 404页面
 * @param {*} props 
 * @returns 
 */
export default function NotFound(props) {
  return <div className={styles.container}>
    <Result
      status="404"
      title="404"
      subTitle="对不起，你访问的页面不存在"
      extra={<Button className={styles.btn} type="primary" onClick={() => {
        AppNavigator.jump('/', true);
      }} >返回主页</Button>}
    />
  </div>
}