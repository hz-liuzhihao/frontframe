import 'package:test/entity/category_data.dart';

class RouterName {
  static final String welcome = 'welcome';
  static final String home = 'home';
  static final String login = 'login';
  static final String user = 'user';
  static final String register = 'register';
  static final String forgetpwd = 'forgetpwd';
  static final String updatepwd = 'updatepwd';
  static final String appWebview = 'appWebview';
}

class GlobalData {
  static bool _lastIsSignIn = false;

  static String _token;

  static bool _isOauth;

  static List<CategoryData> _categorys;

  static bool getLastIsSignIn() {
    return _lastIsSignIn;
  }

  static void setLastIsSignIn(bool lastIsSignIn) {
    _lastIsSignIn = lastIsSignIn;
  }

  static String getToken() {
    return _token == null || _token.isEmpty ? '' : _token;
  }

  static void setToken(String token) {
    _token = token;
  }

  static bool get isOauth => _isOauth ?? false;

  static set isOauth(bool isOauth) => _isOauth = isOauth;

  static List<CategoryData> get categorys => _categorys ?? [];

  static set categorys(List<CategoryData> categorys) => _categorys = categorys;
}

/// 初始化微信环境
Future<void> initWechat() async {
  await registerWxApi(
      appId: "asdf234234fsda",
      doOnAndroid: true,
      doOnIOS: true,
      universalLink: "https://your.univerallink.com/link/");
}

/// 获取设备信息
Future<String> initAndroidDeviceId() async {
  print("初始化设备id");
  DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  AndroidDeviceInfo androidDeviceInfo = await deviceInfo.androidInfo;
  print("初始化自定义设备结束，id为：" + androidDeviceInfo.androidId);
  return androidDeviceInfo.androidId;
}

/// 初始化友盟
Future<void> initUment() async {
  print("初始化友盟统计");
  await Umeng.init(
    androidKey: "60f6dc742a1a2a58e7deacf1",
    iosKey: "60f6dce92a1a2a58e7deacfb",
    onlineParamEnabled: true,
    logEnabled: true,
  );
  if (!Platform.isAndroid) {
    print("初始化友盟结束");
    return;
  }
  String deviceId = await initAndroidDeviceId();
  bool lastIsSignIn = GlobalData.getLastIsSignIn();
  if (lastIsSignIn) {
    Umeng.onProfileSignOff();
    GlobalData.setLastIsSignIn(false);
  } else {
    Umeng.onProfileSignIn(deviceId);
    GlobalData.setLastIsSignIn(true);
  }
  print("初始化友盟结束");
}

/// 初始化环境
Future<void> initEnvironment() async {
  await initWechat();
  await initUment();
}