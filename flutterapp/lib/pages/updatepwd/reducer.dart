import 'package:fish_redux/fish_redux.dart';
import './state.dart';

Reducer<UpdatePwdState> buildReducer() {
  return asReducer(<Object, Reducer<UpdatePwdState>>{});
}
