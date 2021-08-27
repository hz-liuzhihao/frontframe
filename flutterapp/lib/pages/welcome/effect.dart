import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action;
import 'package:flutter_statusbarcolor/flutter_statusbarcolor.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/action.dart';
import 'package:test/global/store/store.dart';
import 'package:test/utils/storage.dart';

import './state.dart';

Effect<WelcomeState> buildEffect() {
  return combineEffects(
    <Object, Effect<WelcomeState>>{
      Lifecycle.initState: _init,
    },
  );
}

void _init(Action action, Context<WelcomeState> context) async {
  await getDataBase().then((prefs) {
    Map<String, dynamic> data = {
      userId: prefs.get(userId),
      userName: prefs.get(userName),
      userAvatar: prefs.get(userAvatar),
      userToken: prefs.get(userToken),
      userIsOauth: prefs.get(userIsOauth),
      userSex: prefs.getInt(userSex),
      userLevel: prefs.getInt(userLevel),
      userIsAgreePrivacy: prefs.getBool(userIsAgreePrivacy) ?? false,
    };
    User user = User();
    user.fromMap(data);
    GlobalStore.store.dispatch(GlobalActionCreator.onSaveUser(user));
  });
  await FlutterStatusbarcolor.setStatusBarColor(Colors.white);
  await FlutterStatusbarcolor.setNavigationBarColor(Colors.black);
}
