import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';

enum UserAction { getUserDetail }

class UserActionCreator {
  static Action getUserDetail(
    User user,
  ) {
    return Action(
      UserAction.getUserDetail,
      payload: {
        "user": user,
      },
    );
  }
}
