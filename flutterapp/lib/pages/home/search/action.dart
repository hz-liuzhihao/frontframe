import 'package:fish_redux/fish_redux.dart';

enum SearchAction { testAction }

class SearchActionCreator {
  static Action testAction(int index) {
    return Action(SearchAction.testAction, payload: index);
  }
}
