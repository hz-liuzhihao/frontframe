import React from 'react';
import Login from "../../bcomponents/Login";
import styles from "./index.less";

/**
 * 登录页面
 * @returns 
 */
export function LoginPage() {

  return <div className={styles.loginPage}>
    <div className={styles.title}>
      交付管理系统
    </div>
    <Login isPage />
  </div>
}
