import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluwx/fluwx.dart';
import 'package:test/components/header.dart';
import 'package:test/components/padding.dart';
import 'package:test/components/phone_validate.dart';
import 'package:test/pages/login/action.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/regexs.dart';
import 'package:test/utils/screen_adapter.dart';
import './state.dart';

Widget buildView(LoginState state, Dispatch dispatch, ViewService viewService) {
  BuildContext context = viewService.context;

  final GlobalKey<FormState> formNameKey = GlobalKey<FormState>();

  final GlobalKey<FormState> formPhoneKey = GlobalKey<FormState>();

  return Scaffold(
    key: Key('login'),
    appBar: appHeader(
      themeColor: Theme.of(context).primaryColor,
      title: '登录',
      subTitle: '',
    ),
    body: Column(
      children: [
        TabBar(
          tabs: state.loginType
              .map((e) => Tab(
                    child: Text(e),
                  ))
              .toList(),
          controller: state.tabController,
          indicatorSize: TabBarIndicatorSize.label,
          indicatorPadding: EdgeInsets.zero,
          labelColor: Theme.of(context).primaryColor,
          unselectedLabelColor: Color(0xff000000),
        ),
        Expanded(
          child: TabBarView(
            controller: state.tabController,
            children: [
              SingleChildScrollView(
                child: Form(
                  key: formNameKey,
                  child: Column(
                    children: [
                      appPadding(
                        padding: 10,
                        child: TextFormField(
                          controller: state.userNameCtrl,
                          decoration: InputDecoration(
                            hintText: '请输入用户名',
                            icon: Icon(Icons.verified_user),
                          ),
                          validator: (value) {
                            if (value == null || value == '') {
                              return '用户名不能为空';
                            }
                            return null;
                          },
                        ),
                      ),
                      appPadding(
                        padding: 10,
                        child: TextFormField(
                          controller: state.passwordCtrl,
                          obscureText: true,
                          decoration: InputDecoration(
                            hintText: '请输入密码',
                            icon: Icon(Icons.lock),
                          ),
                          validator: (value) {
                            if (value == null || value == '') {
                              return '密码不能为空';
                            }
                            return null;
                          },
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          appPaddingLt(
                            paddingTb: 10,
                            paddingLr: 20,
                            child: GestureDetector(
                              child: Text(
                                '忘记密码',
                                style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                ),
                              ),
                              onTap: () {
                                Navigator.of(context).pushNamed(
                                  "forgetpwd",
                                  arguments: null,
                                );
                              },
                            ),
                          ),
                          appPaddingLt(
                            paddingTb: 10,
                            paddingLr: 20,
                            child: GestureDetector(
                              child: Text(
                                '用户注册',
                                style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                ),
                              ),
                              onTap: () {
                                Navigator.of(context)
                                    .pushNamed("register", arguments: null);
                              },
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Expanded(
                            child: appPadding(
                                padding: 10,
                                child: SizedBox(
                                  height: 45,
                                  child: RaisedButton(
                                    child: Text('登录'),
                                    onPressed: () {
                                      if (formNameKey.currentState.validate()) {
                                        dispatch(
                                          LoginActionCreator.nameLogin(
                                            name: state.userNameCtrl.text,
                                            password: state.passwordCtrl.text,
                                          ),
                                        );
                                      }
                                    },
                                    color: Theme.of(context).primaryColor,
                                    textColor: Color(0xffffffff),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          GestureDetector(
                            child: Icon(
                              const IconData(
                                0xe621,
                                fontFamily: "test",
                              ),
                              color: Color(0xff07c160),
                              size: HYSizeFit.setRpx(100),
                            ),
                            onTap: () {
                              isWeChatInstalled.then((isInstall) {
                                if (isInstall) {
                                  sendWeChatAuth(
                                    scope: "snsapi_userinfo",
                                    state: "wechat_sdk_demo_test",
                                  ).then((value) {
                                    showSuccessMsg(value.toString());
                                  });
                                  weChatResponseEventHandler.listen((res) {
                                    if (res is WeChatAuthResponse) {
                                      showSuccessMsg(res.code);
                                    } else {
                                      showWarningMsg("登录失败");
                                    }
                                  });
                                } else {
                                  showWarningMsg("手机未安装微信应用");
                                }
                              });
                            },
                          ),
                          SizedBox(
                            width: HYSizeFit.setRpx(60),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
              ),
              SingleChildScrollView(
                child: Form(
                  key: formPhoneKey,
                  child: Column(
                    children: [
                      appPadding(
                        padding: 10,
                        child: TextFormField(
                          controller: state.phoneCtrl,
                          keyboardType: TextInputType.number,
                          maxLength: 11,
                          decoration: InputDecoration(
                            hintText: '请输入手机号',
                            icon: Icon(Icons.phone_android),
                          ),
                          validator: (value) {
                            if (value == null || value == '') {
                              return '手机号不能为空';
                            }
                            return null;
                          },
                          inputFormatters: [
                            WhitelistingTextInputFormatter.digitsOnly
                          ],
                        ),
                      ),
                      PhoneValidate(
                        controller: state.validateCtrl,
                        onPress: () {
                          String phone = state.phoneCtrl.text;
                          if (phone.isEmpty) {
                            showAppDialog(context, '请输入手机号后再获取验证码');
                            return false;
                          } else if (!validatePhone(phone)) {
                            showAppDialog(context, '请输入正确手机号再获取验证码');
                            return false;
                          }
                          dispatch(LoginActionCreator.getValidateCode(
                            phone: state.phoneCtrl.text,
                          ));
                          return true;
                        },
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          appPaddingLt(
                            paddingTb: 10,
                            paddingLr: 20,
                            child: GestureDetector(
                              child: Text(
                                '用户注册',
                                style: TextStyle(
                                  color: Theme.of(context).primaryColor,
                                ),
                              ),
                              onTap: () {
                                Navigator.of(context)
                                    .pushNamed("register", arguments: null);
                              },
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Expanded(
                            child: appPadding(
                                padding: 10,
                                child: SizedBox(
                                  height: 45,
                                  child: RaisedButton(
                                    child: Text('登录'),
                                    onPressed: () {
                                      if (formPhoneKey.currentState
                                          .validate()) {
                                        dispatch(LoginActionCreator.phoneLogin(
                                          phone: state.phoneCtrl.text,
                                          validateCode: state.validateCtrl.text,
                                        ));
                                      }
                                    },
                                    color: Theme.of(context).primaryColor,
                                    textColor: Color(0xffffffff),
                                  ),
                                )),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}
