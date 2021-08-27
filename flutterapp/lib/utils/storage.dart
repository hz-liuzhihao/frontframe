import 'package:shared_preferences/shared_preferences.dart';
import 'package:test/application.dart';
import 'package:test/entity/user.dart';

/// 初始化数据表
Future<SharedPreferences> initDataBase() async {
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  if (sharedPreferences.get(userId) == null) {
    sharedPreferences.setString(userId, "youke");
  }
  if (sharedPreferences.get(userName) == null) {
    sharedPreferences.setString(userName, "游客");
  }
  if (sharedPreferences.get(userAvatar) == null) {
    sharedPreferences.setString(userAvatar, "images/youke.png");
  }
  GlobalData.setToken(sharedPreferences.get(userToken));
  GlobalData.isOauth = sharedPreferences.getBool(userIsOauth);
  return sharedPreferences;
}

/// 获取鼠标操作db
Future<SharedPreferences> getDataBase() async {
  return await initDataBase();
}
