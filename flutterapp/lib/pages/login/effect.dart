import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action;
import 'package:test/application.dart';
import 'package:test/components/state_ticker_provider.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/action.dart';
import 'package:test/global/store/store.dart';
import 'package:test/pages/login/action.dart';
import 'package:test/utils/app_constant.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/network.dart';
import 'package:test/utils/storage.dart';
import './state.dart';

Effect<LoginState> buildEffect() {
  return combineEffects(<Object, Effect<LoginState>>{
    Lifecycle.initState: _onInit,
    LoginAction.nameLogin: _loginName,
    LoginAction.phoneLogin: _loginPhone,
    LoginAction.getValidate: _getValidator
  });
}

void _onInit(Action action, Context<LoginState> ctx) {
  final TickerProvider tickerProvider =
      ctx.stfState as StateWidthTickerProvider;
  ctx.state.tabController = TabController(
    length: ctx.state.loginType.length,
    vsync: tickerProvider,
  );
}

/// 用户名登录
void _loginName(Action action, Context<LoginState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/pslogin',
    ctx.context,
    parameters: {
      'name': payload['name'],
      'password': payload['password'],
    },
  ).then((result) {
    Map<String, dynamic> data = result['data'];
    User user = User();
    user.fromMap(data);
    user.name = data['name'];
    GlobalStore.store.dispatch(GlobalActionCreator.onSaveUser(user));
    getDataBase().then((perfs) {
      perfs.setString(userId, data['id']);
      perfs.setString(userName, data['name']);
      perfs.setString(userAvatar, data['avatar'] ?? NO_AVATAR_URL);
      perfs.setString(userToken, data['token']);
      perfs.setBool(userIsOauth, data["isOauth"] ?? false);
      perfs.setInt(userSex, data["sex"] ?? 0);
      GlobalData.setToken(data['token']);
    });
    Navigator.of(ctx.context).pop();
  });
}

/// 手机号登录
void _loginPhone(Action action, Context<LoginState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/pologin',
    ctx.context,
    parameters: {
      'phone': payload['phone'],
      'validateCode': payload['validateCode'],
    },
  ).then((result) {
    Map<String, dynamic> data = result['data'];
    User user = User();
    user.fromMap(data);
    user.name = data['name'];
    GlobalStore.store.dispatch(GlobalActionCreator.onSaveUser(user));
    getDataBase().then((perfs) {
      perfs.setString(userId, data['id']);
      perfs.setString(userName, data['name']);
      perfs.setString(userAvatar, data['imageUrl']);
      perfs.setString(userToken, data['token']);
      GlobalData.setToken(data['token']);
    });
    Navigator.of(ctx.context).pop();
  });
}

/// 获取验证码
void _getValidator(Action action, Context<LoginState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '/cm/validatecode',
    ctx.context,
    parameters: {
      'phone': payload['phone'],
    },
  ).then((result) {
    if (result["code"] == 200) {
      showSuccessMsg('获取验证码成功');
    }
  });
}
