import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';

import 'state.dart';
import 'action.dart';

/// 建立一个全局的reducer
Reducer<GlobalState> buildReducer() {
  return asReducer(
      <Object, Reducer<GlobalState>>{GlobalAction.saveUser: _saveUser});
}

GlobalState _saveUser(GlobalState state, Action action) {
  User user = action.payload;
  return state.clone()..user = user;
}
