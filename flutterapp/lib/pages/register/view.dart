import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:test/components/header.dart';
import 'package:test/components/padding.dart';
import 'package:test/components/phone_validate.dart';
import 'package:test/pages/register/action.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/regexs.dart';
import './state.dart';

Widget buildView(
  RegisterState state,
  Dispatch dispatch,
  ViewService viewService,
) {
  BuildContext context = viewService.context;
  final GlobalKey<FormState> formPhoneKey = GlobalKey<FormState>();

  return Scaffold(
    key: Key("register"),
    appBar: appHeader(
      themeColor: Theme.of(context).primaryColor,
      title: '注册',
      subTitle: '',
    ),
    body: SingleChildScrollView(
      child: Form(
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
                inputFormatters: [WhitelistingTextInputFormatter.digitsOnly],
              ),
            ),
            appPadding(
              padding: 10,
              child: TextFormField(
                controller: state.passwordCtrl,
                obscureText: true,
                decoration: InputDecoration(
                  hintText: '请输入登录密码',
                  icon: Icon(Icons.lock),
                ),
                validator: (value) {
                  if (value == null || value == '') {
                    return '密码不能为空';
                  }
                  if (value.length < 8 || value.length > 16) {
                    return '密码的长度需要8-16位';
                  }
                  if (value != state.againPasswordCtrl.text) {
                    return '两次密码输入不一致';
                  }
                  return null;
                },
              ),
            ),
            appPadding(
              padding: 10,
              child: TextFormField(
                controller: state.againPasswordCtrl,
                obscureText: true,
                decoration: InputDecoration(
                  hintText: '请再次输入密码',
                  icon: Icon(Icons.lock),
                ),
                validator: (value) {
                  if (value == null || value == '') {
                    return '密码不能为空';
                  }
                  if (state.passwordCtrl.text != value) {
                    return '两次密码输入不一致';
                  }
                  return null;
                },
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
                dispatch(RegisterActionCreator.getValidateCode(
                  phone: state.phoneCtrl.text,
                ));
                return true;
              },
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                appPaddingLt(
                  paddingTb: 10,
                  paddingLr: 20,
                  child: GestureDetector(
                    child: Text(
                      '已有账号，去登录',
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                      ),
                    ),
                    onTap: () {
                      Navigator.of(context).pop();
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
                          child: Text('注册'),
                          onPressed: () {
                            if (formPhoneKey.currentState.validate()) {
                              dispatch(
                                RegisterActionCreator.phoneRegister(
                                  phone: state.phoneCtrl.text,
                                  validateCode: state.validateCtrl.text,
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
          ],
        ),
        key: formPhoneKey,
      ),
    ),
  );
}
