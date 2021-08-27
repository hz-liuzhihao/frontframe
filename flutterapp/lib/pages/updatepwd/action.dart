import 'package:fish_redux/fish_redux.dart';

enum UpdatePwdAction { updatePwd }

class UpdatePwdActionCreator {
  // 修改密码
  static Action updatePwd({
    String oldPassword,
    String newPassword,
  }) {
    return Action(UpdatePwdAction.updatePwd, payload: <String, dynamic>{
      "oldPassword": oldPassword,
      "newPassword": newPassword,
    });
  }
}
