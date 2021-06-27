import { connect } from 'dva';
import React, { PureComponent } from "react";
import { Tabs, Form, Button } from "antd";
import { GLOBAL_CONFIG } from '../../utils/config';
import { FormPhone, FormPassword } from '../../components/FormItem';
import styles from './index.less';

class Login extends PureComponent {

  render() {
    return <div className={styles.container}>
      <div className={styles.info}>
        <Tabs defaultActiveKey="password" size="large">
          <Tabs.TabPane key="password" tabKey="password" tab="密码登录">
            <Form name="password" className={styles.passwordContainer}>
              <FormPhone
                required
                decorate="phone"
                wrapperProps={{
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  placeholder: '请输入手机号',
                  size: 'large'
                }}
              />
              <FormPassword
                required
                decorate="password"
                wrapperProps={{
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  placeholder: '请输入密码',
                  size: 'large',
                  inputType: 'password'
                }}
              />
              <div className={styles.forgetPassword}><Button type='link' style={{ color: '#8590a6' }}>忘记密码？</Button></div>
              <Button type='primary' size='large' style={{ width: '100%' }}>登录</Button>
            </Form>
            <div className={styles.tipContainer}>
              未注册手机验证后自动登录，注册即代表同意《xxxx协议》《隐私保护指引》
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane key="phone" tabKey="phone" tab="免密登录">
            <Form name="phone" className={styles.phoneContainer}>

            </Form>
            <div className={styles.tipContainer}>
              未注册手机验证后自动登录，注册即代表同意《xxxx协议》《隐私保护指引》
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane key="scan" tabKey="scan" tab="扫码登录">
            <div className={styles.socialContainer}>
              <FormPhone
                required
                decorate="phone"
                wrapperProps={{
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  placeholder: '请输入手机号',
                  size: 'large'
                }}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className={styles.navigator}>

      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    ...state[GLOBAL_CONFIG.security],
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Login);