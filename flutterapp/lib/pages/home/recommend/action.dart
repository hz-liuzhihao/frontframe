import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/banner.dart';
import 'package:test/entity/good.dart';

enum RecommendAction {
  testAction
}

class RecommendActionCreator {

  static Action testAction() {
    return Action(RecommendAction.testAction, payload: {});
  }
}
