import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/state.dart';

class LoginState implements GlobalBaseState, Cloneable<LoginState> {
  @override
  User user;

  TabController tabController;

  List<String> loginType = [];

  TextEditingController userNameCtrl, passwordCtrl, phoneCtrl, validateCtrl;

  LoginState clone() {
    return LoginState()
      ..user = user
      ..tabController = tabController
      ..loginType = loginType
      ..userNameCtrl = userNameCtrl
      ..passwordCtrl = passwordCtrl
      ..phoneCtrl = phoneCtrl
      ..validateCtrl = validateCtrl;
  }
}

LoginState initState(Map<String, dynamic> args) {
  LoginState loginState = LoginState();
  loginState.loginType.add('密码登录');
  loginState.loginType.add('手机号登录');
  loginState
    ..userNameCtrl = TextEditingController()
    ..passwordCtrl = TextEditingController()
    ..phoneCtrl = TextEditingController()
    ..validateCtrl = TextEditingController();
  return loginState;
}
