import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/state.dart';

class RegisterState implements GlobalBaseState, Cloneable<RegisterState> {
  @override
  User user;

  TextEditingController phoneCtrl,
      validateCtrl,
      passwordCtrl,
      againPasswordCtrl;

  RegisterState clone() {
    return RegisterState()
      ..user = user
      ..phoneCtrl = phoneCtrl
      ..validateCtrl = validateCtrl
      ..passwordCtrl = passwordCtrl
      ..againPasswordCtrl = againPasswordCtrl;
  }
}

RegisterState initState(Map<String, dynamic> args) {
  RegisterState loginState = RegisterState();
  loginState
    ..phoneCtrl = TextEditingController()
    ..validateCtrl = TextEditingController()
    ..passwordCtrl = TextEditingController()
    ..againPasswordCtrl = TextEditingController();
  return loginState;
}
