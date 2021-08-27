import 'package:fish_redux/fish_redux.dart';
import 'package:xqh/global/store/state.dart';
import 'package:xqh/entity/user.dart';

class TemplatePageState implements GlobalBaseState, Cloneable<TemplatePageState> {
  @override
  User user;

  TemplatePageState clone() {
    return TemplatePageState()..user = user;
  }
}

TemplatePageState initState(Map<String, dynamic> args) {
  return TemplatePageState();
}
