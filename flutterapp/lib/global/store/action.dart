import 'package:fish_redux/fish_redux.dart';
import 'package:test/entity/user.dart';

enum GlobalAction { saveUser }

// 创建全局reducer的Action
class GlobalActionCreator {
  static Action onSaveUser(User user) {
    return Action(GlobalAction.saveUser, payload: user);
  }
}
