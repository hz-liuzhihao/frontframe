import 'dart:async';

import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:uni_links/uni_links.dart';
import 'package:test/application.dart';
import 'package:test/pages/welcome/state.dart';
import 'package:test/styles/common.dart';
import 'package:test/utils/app_navigator.dart';
import 'package:test/utils/screen_adapter.dart';

enum UniLinksType { string, uri }

class Entrance extends StatefulWidget {
  _EntranceState createState() => _EntranceState();
}

class _EntranceState extends State<Entrance> {
  final UniLinksType _type = UniLinksType.string;

  // StreamSubscription _sub;

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  Future<void> initPlatformState() async {
    if (_type == UniLinksType.string) {
      await initPlatformStateForStringUniLinks();
    }
  }

  /// 使用[String]链接实现
  Future<void> initPlatformStateForStringUniLinks() async {
    String initialLink;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      initialLink = await getInitialLink() ?? '';
      //  跳转到指定页面
      AppNavigator.schemeJump(context, initialLink, isReplace: true);
    } on PlatformException {
      Navigator.of(context)
          .pushNamedAndRemoveUntil(RouterName.home, (route) => false);
    } on FormatException {
      Navigator.of(context)
          .pushNamedAndRemoveUntil(RouterName.home, (route) => false);
    }
    // Attach a listener to the links stream
    // _sub = getLinksStream().listen((String link) {
    //   if (!mounted) return;
    //   print('link--$link');
    //   //  跳转到指定页面
    //   schemeJump(context, link);
    // }, onError: (Object err) {
    //   if (!mounted) return;
    // });
  }

  // @override
  // void dispose() {
  //   super.dispose();
  //   _sub.cancel();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: null,
      body: Container(
        child: Center(
          child: GestureDetector(
            onTap: () {
              Navigator.of(context)
                  .pushNamedAndRemoveUntil("home", (route) => false);
            },
            child: Container(
              width: HYSizeFit.setRpx(200),
              height: HYSizeFit.setRpx(200),
              child: Image.asset("images/product-icon.png"),
            ),
          ),
        ),
      ),
    );
  }
}

Widget buildView(
    WelcomeState state, Dispatch dispatch, ViewService viewService) {
  BuildContext context = viewService.context;

  /// 欢迎页面初始化
  HYSizeFit.initialize(context);
  Styles.initialize(context);

  return Entrance();
}
