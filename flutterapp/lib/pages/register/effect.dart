import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action;
import 'package:test/utils/commons.dart';
import 'package:test/utils/network.dart';
import './state.dart';
import './action.dart';

Effect<RegisterState> buildEffect() {
  return combineEffects(<Object, Effect<RegisterState>>{
    Lifecycle.initState: _onInit,
    RegisterAction.getValidateCode: _getValidateCode,
    RegisterAction.register: _register,
  });
}

void _onInit(Action action, Context<RegisterState> ctx) {}

void _getValidateCode(Action action, Context<RegisterState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/validatecode',
    ctx.context,
    parameters: {
      "phone": payload["phone"],
    },
  ).then((result) {
    if (result["code"] == 200) {
      showSuccessMsg("获取验证码成功");
    }
  });
}

void _register(Action action, Context<RegisterState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/register',
    ctx.context,
    parameters: {
      "phone": payload["phone"],
      "validateCode": payload["validateCode"],
      "password": payload["password"],
    },
  ).then((result) {
    if (result["code"] == 200) {
      showSuccessMsg("注册成功");
      Navigator.of(ctx.context).pop();
    }
  });
}
