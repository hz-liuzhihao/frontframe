import 'package:fish_redux/fish_redux.dart';
import 'package:test/global/store/state.dart';
import 'package:test/entity/user.dart';

class WelcomeState implements GlobalBaseState, Cloneable<WelcomeState> {
  @override
  User user;

  WelcomeState clone() {
    return WelcomeState()..user = user;
  }
}

WelcomeState initState(Map<String, dynamic> args) {
  return WelcomeState();
}
