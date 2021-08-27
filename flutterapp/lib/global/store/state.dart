import 'dart:ui';

import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';

abstract class GlobalBaseState {
  User get user;

  set user(User user);
}

/// 建立一个全局State
class GlobalState implements GlobalBaseState, Cloneable<GlobalState> {
  User user;

  @override
  GlobalState clone() {
    return GlobalState()..user = user;
  }
}
