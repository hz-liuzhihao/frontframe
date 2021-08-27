import 'package:fish_redux/fish_redux.dart';

enum LoginAction { nameLogin, phoneLogin, getValidate }

class LoginActionCreator {
  /// 用户名登录
  static Action nameLogin({
    String name,
    String password,
  }) {
    return Action(LoginAction.nameLogin, payload: <String, dynamic>{
      "name": name,
      "password": password,
    });
  }

  /// 手机号登录
  static Action phoneLogin({
    String phone,
    String validateCode,
  }) {
    return Action(LoginAction.phoneLogin, payload: <String, dynamic>{
      "phone": phone,
      "validateCode": validateCode,
    });
  }

  /// 获取验证码
  static Action getValidateCode({
    String phone,
  }) {
    return Action(LoginAction.getValidate, payload: {
      "phone": phone,
    });
  }
}
