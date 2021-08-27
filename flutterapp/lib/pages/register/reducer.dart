import 'package:fish_redux/fish_redux.dart';
import './state.dart';

Reducer<RegisterState> buildReducer() {
  return asReducer(<Object, Reducer<RegisterState>>{});
}
