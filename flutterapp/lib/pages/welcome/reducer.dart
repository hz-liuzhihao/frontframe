import 'package:fish_redux/fish_redux.dart';
import './state.dart';

Reducer<WelcomeState> buildReducer() {
  return asReducer(<Object, Reducer<WelcomeState>>{});
}
