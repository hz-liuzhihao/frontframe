import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/state.dart';

class WebViewState implements GlobalBaseState, Cloneable<WebViewState> {
  @override
  User user;

  String url;

  String title;

  WebViewState clone() {
    return WebViewState()
      ..user = user
      ..url = url
      ..title = title;
  }
}

WebViewState initState(Map<String, dynamic> args) {
  WebViewState webViewState = new WebViewState();
  if (args != null) {
    webViewState.url = args["url"];
    webViewState.title = args["title"];
  }
  return webViewState;
}
