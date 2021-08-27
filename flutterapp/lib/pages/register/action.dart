import 'package:fish_redux/fish_redux.dart';

enum RegisterAction { register, getValidateCode }

class RegisterActionCreator {
  // 手机号注册
  static Action phoneRegister({
    String phone,
    String validateCode,
    String password,
  }) {
    return Action(RegisterAction.register, payload: <String, dynamic>{
      "phone": phone,
      "validateCode": validateCode,
      "password": password,
    });
  }

  // 获取验证码
  static Action getValidateCode({
    String phone,
  }) {
    return Action(RegisterAction.getValidateCode, payload: <String, dynamic>{
      "phone": phone,
    });
  }
}
