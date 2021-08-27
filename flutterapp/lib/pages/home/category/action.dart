import 'package:fish_redux/fish_redux.dart';

enum CategoryAction { testAction }

class CategoryActionCreator {
  static Action testAction(int index) {
    return Action(CategoryAction.testAction, payload: index);
  }
}
