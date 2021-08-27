import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:xqh/pages/account_info/state.dart';
import 'package:xqh/styles/common.dart';
import 'package:xqh/utils/screen_adapter.dart';

Widget buildView(
    TemplatePageState state, Dispatch dispatch, ViewService viewService) {
  return Scaffold(
      key: Key(''),
      appBar: appHeader(
        themeColor: Theme.of(context).primaryColor,
        title: '页面title',
        subTitle: '',
      ),
      body: Container(
        child: Center(
          child: Container(
            width: HYSizeFit.setRpx(200),
            height: HYSizeFit.setRpx(200),
            child: Text("页面"),
          ),
        ),
      ));
}
