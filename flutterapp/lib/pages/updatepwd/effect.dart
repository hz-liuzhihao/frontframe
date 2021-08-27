import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action;
import 'package:test/pages/updatepwd/action.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/network.dart';

import './state.dart';

Effect<UpdatePwdState> buildEffect() {
  return combineEffects(
    <Object, Effect<UpdatePwdState>>{
      Lifecycle.initState: _init,
      UpdatePwdAction.updatePwd: _updatePwd,
    },
  );
}

void _init(Action action, Context<UpdatePwdState> context) {}

void _updatePwd(Action action, Context<UpdatePwdState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/editpassword',
    ctx.context,
    parameters: {
      "oldPassword": payload["oldPassword"],
      "newPassword": payload["newPassword"],
    },
  ).then((result) {
    if (result["code"] == 200) {
      showSuccessMsg("修改密码成功");
      Navigator.of(ctx.context).pop();
    }
  });
}
