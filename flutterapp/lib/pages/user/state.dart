import 'package:fish_redux/fish_redux.dart';
import 'package:test/global/store/state.dart';
import 'package:test/entity/user.dart';

class UserState implements GlobalBaseState, Cloneable<UserState> {
  @override
  User user;

  UserState clone() {
    return UserState()..user = user;
  }
}

UserState initState(Map<String, dynamic> args) {
  return UserState();
}
