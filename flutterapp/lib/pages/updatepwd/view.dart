import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/components/header.dart';
import 'package:test/components/padding.dart';
import 'package:test/pages/updatepwd/action.dart';
import 'package:test/utils/commons.dart';
import './state.dart';

Widget buildView(
    UpdatePwdState state, Dispatch dispatch, ViewService viewService) {
  final GlobalKey<FormState> formUpdatePwdKey = GlobalKey<FormState>();
  BuildContext context = viewService.context;
  return Scaffold(
    key: Key('updatepwd'),
    appBar: appHeader(
      themeColor: Theme.of(context).primaryColor,
      title: '修改密码',
      subTitle: '',
    ),
    body: SingleChildScrollView(
      child: Container(
        child: Form(
          key: formUpdatePwdKey,
          child: Column(
            children: <Widget>[
              Column(
                children: [
                  appPadding(
                    padding: 10,
                    child: TextFormField(
                      controller: state.oldPwdCtrl,
                      maxLength: 11,
                      decoration: InputDecoration(
                        hintText: '请输入旧密码',
                        icon: Icon(Icons.lock),
                      ),
                      validator: (value) {
                        if (value == null || value == '') {
                          return '旧密码不能为空';
                        }
                        return null;
                      },
                    ),
                  ),
                  appPadding(
                    padding: 10,
                    child: TextFormField(
                      controller: state.newPwdCtrl,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: '请输入新密码',
                        icon: Icon(Icons.lock),
                      ),
                      validator: (value) {
                        if (value == null || value == '') {
                          return '密码不能为空';
                        }
                        if (value.length < 8 || value.length > 16) {
                          return '密码的长度需要8-16位';
                        }
                        if (value != state.newPwdCtrl.text) {
                          return '两次密码输入不一致';
                        }
                        return null;
                      },
                    ),
                  ),
                  appPadding(
                    padding: 10,
                    child: TextFormField(
                      controller: state.againPwdCtrl,
                      obscureText: true,
                      decoration: InputDecoration(
                        hintText: '请再次输入新密码',
                        icon: Icon(Icons.lock),
                      ),
                      validator: (value) {
                        if (value == null || value == '') {
                          return '密码不能为空';
                        }
                        if (value.length < 8 || value.length > 16) {
                          return '密码的长度需要8-16位';
                        }
                        if (value != state.newPwdCtrl.text) {
                          return '两次密码输入不一致';
                        }
                        return null;
                      },
                    ),
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: appPadding(
                            padding: 10,
                            child: SizedBox(
                              height: 45,
                              child: RaisedButton(
                                child: Text('重置密码'),
                                onPressed: () {
                                  if (formUpdatePwdKey.currentState
                                      .validate()) {
                                    if (state.oldPwdCtrl.text ==
                                        state.newPwdCtrl.text) {
                                      showWarningMsg("新密码和旧密码不能相同");
                                      return;
                                    }
                                    dispatch(
                                      UpdatePwdActionCreator.updatePwd(
                                        oldPassword: state.oldPwdCtrl.text,
                                        newPassword: state.newPwdCtrl.text,
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
            ],
          ),
        ),
      ),
    ),
  );
}
