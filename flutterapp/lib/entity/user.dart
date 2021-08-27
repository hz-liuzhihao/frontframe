final String userId = 'id';
final String userName = 'name';
final String userAvatar = 'avatar';
final String userToken = 'token';
final String userIsOauth = 'isOauth';
final String userSex = 'sex';
final String userLevel = 'level';
final String userIsAgreePrivacy = 'isAgreePrivacy';

class User {
  String id;
  String name;
  String avatar;
  String token;
  int sex = 0;
  int level = 0;
  String info;
  String phone;
  String email;
  bool isOauth;
  bool isAgreePrivacy;

  Map<String, dynamic> toMap() {
    var map = <String, dynamic>{
      userId: id,
      userName: name,
      userAvatar: avatar,
      userToken: token,
      userIsOauth: isOauth,
      userSex: sex,
      userLevel: level,
      userIsAgreePrivacy: isAgreePrivacy,
    };
    return map;
  }

  void fromMap(Map<String, dynamic> map) {
    id = map[userId];
    name = map[userName];
    avatar = map[userAvatar];
    token = map[userToken];
    isOauth = map[userIsOauth];
    sex = map[userSex];
    level = map[userLevel];
    isAgreePrivacy = map[userIsAgreePrivacy];
  }

  User clone() {
    return User()
      ..avatar = avatar
      ..email = email
      ..id = id
      ..info = info
      ..isAgreePrivacy = isAgreePrivacy
      ..isOauth = isOauth
      ..level = level
      ..phone = phone
      ..sex = sex
      ..token = token;
  }
}
