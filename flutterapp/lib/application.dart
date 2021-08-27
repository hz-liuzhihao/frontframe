import 'package:test/entity/category_data.dart';

const String API_PREFIX = 'http://3704uf7164.wicp.vip/';
// http://3704uf7164.wicp.vip/
// http://www.xingqinghao.com/

const String JD_IMAGE_PREFIX = 'https://img14.360buyimg.com/n1/';

const String ARTICLE_DETAIL_URL =
    'http://www.xingqinghao.com/ci/index#/article/detail?id=';

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
