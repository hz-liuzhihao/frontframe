import 'package:fish_redux/fish_redux.dart';
import 'package:xqh/entity/user.dart';

enum TemplatePageAction { getUserDetail }

class TemplatePageActionCreator {
  static Action getUserDetail(
    User user,
  ) {
    return Action(
      TemplatePageAction.getUserDetail,
      payload: {
        "user": user,
      },
    );
  }
}
