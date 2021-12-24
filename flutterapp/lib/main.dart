import 'package:flutter/material.dart' hide Action, Page;
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/storage.dart';
import 'dart:io';

import 'app.dart';

void main() {
  FlutterError.onError = (FlutterErrorDetails details) {
    Fluttertoast.showToast(msg: details.toString());
  };
  WidgetsFlutterBinding.ensureInitialized();
  /// 先初始化环境再初始化持久层数据
  initEnvironment().then((value) {
    initDataBase().then((value) {
      runApp(createApp());
      if (Platform.isAndroid) {
        SystemUiOverlayStyle systemUiOverlayStyle = SystemUiOverlayStyle(
          statusBarColor: Color(0xffffffff),
          statusBarBrightness: Brightness.dark,
          statusBarIconBrightness: Brightness.dark,
          systemNavigationBarIconBrightness: Brightness.dark,
          systemNavigationBarColor: Colors.white,
        );
        SystemChrome.setSystemUIOverlayStyle(systemUiOverlayStyle);
        SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
      }
    });
  });
}
