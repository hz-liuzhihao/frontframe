import 'package:fish_redux/fish_redux.dart';

enum TestAction { testAction }

class TestActionCreator {

  static Action testAction(List<User> users) {
    return Action(ArticleAction.testAction, payload: users);
  }
}
