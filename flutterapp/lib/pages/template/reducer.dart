import 'package:fish_redux/fish_redux.dart';
import './state.dart';

Reducer<TemplatePageState> buildReducer() {
  return asReducer(<Object, Reducer<TemplatePageState>>{});
}
