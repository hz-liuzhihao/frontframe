import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';

enum WelcomeAction { getBannerUrl }

class WelcomeActionCreator {
  static Action getUserDetail(
    User user,
  ) {
    return Action(
      WelcomeAction.getBannerUrl,
      payload: {
        "user": user,
      },
    );
  }
}
