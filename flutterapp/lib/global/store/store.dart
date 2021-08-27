import 'package:fish_redux/fish_redux.dart';
import 'state.dart';
import 'reducer.dart';

/// 建立一个全局Store
class GlobalStore {
  static Store<GlobalState> _globalStore;

  static Store<GlobalState> get store => 
    _globalStore ??= createStore<GlobalState>(GlobalState(), buildReducer());
}