import 'package:fish_redux/fish_redux.dart';

enum WebViewAction { updateOauthStatus }

class WebViewActionCreator {
  static Action updateOauthStatus() {
    return Action(
      WebViewAction.updateOauthStatus,
    );
  }
}
