import 'package:flutter/widgets.dart';
import 'package:test/application.dart';

class AppNavigator {
  static final List<String> _needLoginRouteName = [
    RouterName.jdOauth,
    RouterName.addArtical
  ];

  static final List<String> _needOauthRouteName = [RouterName.addArtical];

  static pushNamed(BuildContext context, String name, {Object arguments}) {
    if (_needLoginRouteName.indexOf(name) > -1 &&
        (GlobalData.getToken() == null || GlobalData.getToken().isEmpty)) {
      Navigator.of(context).pushNamed(
        RouterName.login,
      );
      return;
    } else if (_needOauthRouteName.indexOf(name) > -1 && !GlobalData.isOauth) {
      Navigator.of(context).pushNamed(
        RouterName.jdOauth,
      );
      return;
    }
    Navigator.of(context).pushNamed(name, arguments: arguments);
  }

  /// 打开应用链接
  static openLink(BuildContext context, String link, {dynamic params}) {
    if (link == null || link.isEmpty) {
      return;
    }
    if (link.startsWith("http://") || link.startsWith("https://")) {
      params["url"] = link;
      pushNamed(context, RouterName.appWebview, arguments: params);
    } else {
      pushNamed(context, link, arguments: params);
    }
  }

  /// sheme跳转
  static schemeJump(BuildContext context, String schemeUrl,
      {bool isReplace = false}) {
    final _jumpUri = Uri.parse(schemeUrl.replaceFirst(
      "xingqinghao://",
      "http://path/",
    ));
    switch (_jumpUri.path) {
      case '/articledetail':
        if (isReplace) {
          Navigator.of(context).pushNamedAndRemoveUntil(
            RouterName.articleDetail,
            (route) => false,
            arguments: {
              "id": _jumpUri.queryParameters["id"],
            },
          );
        } else {
          Navigator.of(context).pushNamed(
            RouterName.articleDetail,
            arguments: {
              "id": _jumpUri.queryParameters["id"],
            },
          );
        }
        break;
      case 'gooddetail':
        if (isReplace) {
          Navigator.of(context).pushNamedAndRemoveUntil(
            RouterName.goodDetail,
            (route) => false,
            arguments: {
              "id": _jumpUri.queryParameters["id"],
            },
          );
        } else {
          Navigator.of(context).pushNamed(
            RouterName.goodDetail,
            arguments: {
              "id": _jumpUri.queryParameters["id"],
            },
          );
        }
        break;
      default:
        break;
    }
  }
}
