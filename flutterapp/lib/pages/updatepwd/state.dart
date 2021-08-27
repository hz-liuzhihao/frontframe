import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/global/store/state.dart';
import 'package:test/entity/user.dart';

class UpdatePwdState implements GlobalBaseState, Cloneable<UpdatePwdState> {
  @override
  User user;

  TextEditingController oldPwdCtrl, newPwdCtrl, againPwdCtrl;

  UpdatePwdState clone() {
    return UpdatePwdState()
      ..user = user
      ..oldPwdCtrl = oldPwdCtrl
      ..newPwdCtrl = newPwdCtrl
      ..againPwdCtrl = againPwdCtrl;
  }
}

UpdatePwdState initState(Map<String, dynamic> args) {
  UpdatePwdState updatePwdState = new UpdatePwdState();
  updatePwdState
    ..oldPwdCtrl = TextEditingController()
    ..newPwdCtrl = TextEditingController()
    ..againPwdCtrl = TextEditingController();
  return updatePwdState;
}
