import { connect } from 'dva';
import React, { PureComponent } from "react";
import { Tabs, Form, Button } from "antd";
import { GLOBAL_CONFIG } from '../../utils/config';
import { FormPhone, FormPassword, FormVeriCode } from '../../components/FormItem';
import styles from './index.less';
import PropTypes from 'prop-types';

/**
 * 整个应用的登录逻辑
 */
class Login extends PureComponent {

  static propTypes = {
    isPage: PropTypes.bool
  }

  static defaultProps = {
    isPage: false
  }

  constructor(props) {
    super(props);
    this.psFormRef = React.createRef();
    this.poFormRef = React.createRef();
  }

  /**
   * 获取验证码
   * @returns 
   */
  doGetVerCode = () => {
    return new Promise((resolve) => {
      const { current } = this.poFormRef;
      if (current) {
        current.validateFields(['phone']).then(() => {
          resolve(true);
        }).catch(errorInfo => {
          const { errorFields = [] } = errorInfo;
          const result = errorFields.some((item) => {
            const { name = [] } = item || {};
            if (name.indexOf('phone')) {
              return true;
            }
          });
          resolve(result);
        });
      }
    });
  }

  /**
   * 密码登录
   * @param {*} values 
   */
  doPsFinish = (values) => {
    const { dispatch, isPage } = this.props;
    dispatch({
      type: `${GLOBAL_CONFIG.security}/psLogin`,
      payload: values,
      isPage
    });
  }

  /**
   * 手机号登录
   * @param {*} values 
   */
  doPoFinish = (values) => {
    const { dispatch, isPage } = this.props;
    dispatch({
      type: `${GLOBAL_CONFIG.security}/poLogin`,
      payload: values,
      isPage
    });
  }

  render() {
    return <div className={styles.container}>
      <div className={styles.info}>
        <Tabs defaultActiveKey="password" size="large">
          <Tabs.TabPane key="password" tabKey="password" tab="密码登录">
            <Form ref={this.psFormRef} name="password" onFinish={this.doPsFinish} className={styles.passwordContainer}>
              <FormPhone
                required
                decorate="phone"
                wrapperProps={{
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  placeholder: '请输入手机号',
                  size: 'large',
                  maxLength: 11
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
              <Button htmlType="submit" type='primary' size='large' style={{ width: '100%' }}>登录</Button>
            </Form>
            <div className={styles.tipContainer}>
              未注册手机验证后自动登录，注册即代表同意《xxxx协议》《隐私保护指引》
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane key="phone" tabKey="phone" tab="免密登录">
            <Form ref={this.poFormRef} name="phone" onFinish={this.doPoFinish} className={styles.phoneContainer}>
              <FormPhone
                required
                decorate="phone"
                wrapperProps={{
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  placeholder: '请输入手机号',
                  size: 'large',
                  maxLength: 11
                }}
              />
              <FormVeriCode
                required
                decorate="vericode"
                wrapperProps={{
                  onGetVerCode: this.doGetVerCode,
                  allowClear: true,
                  bordered: false,
                  singleBorder: true,
                  size: 'large',
                  placeholder: '请输入验证码',
                  maxLength: 6
                }}
              />
              <Button htmlType="submit" type='primary' size='large' style={{ width: '100%' }}>注册/登录</Button>
            </Form>
            <div className={styles.tipContainer}>
              未注册手机验证后自动登录，注册即代表同意《xxxx协议》《隐私保护指引》
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane key="scan" tabKey="scan" tab="扫码登录">
            <div className={styles.qrCode} id="qrCode" ref={() => {
              window.DDLogin({
                id: 'qrCode',
                goto: encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoi0tcza51z8htszy&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://${location.host}/oauth/ding/scanlogin`),
                style: 'border:none;background-color:#fff;margin-top:-30px;',
                height: 300
              });
              window.addEventListener('message', function (event) {
                const origin = event.origin;
                if (origin == "https://login.dingtalk.com") {
                  const loginTmpCode = event.data;
                  window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoi0tcza51z8htszy&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI&loginTmpCode=${loginTmpCode}`;
                }
              }, false);
            }}>
            </div>
            <div className={styles.socialContainer}>
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