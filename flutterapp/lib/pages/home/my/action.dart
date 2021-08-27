import 'package:fish_redux/fish_redux.dart';

enum MyAction { testAction }

class MyActionCreator {

  static Action testAction(int index) {
    return Action(MyAction.testAction, payload: index);
  }
}
