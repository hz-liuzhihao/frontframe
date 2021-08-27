import 'package:fish_redux/fish_redux.dart';
import 'package:test/pages/web_view/state.dart';

Reducer<WebViewState> buildReducer() {
  return asReducer(<Object, Reducer<WebViewState>>{});
}
