import 'dart:io';

import 'package:dio/dio.dart';
import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/application.dart';
import 'package:test/components/avatar.dart';
import 'package:test/components/image_picker.dart';
import 'package:test/components/normal.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/action.dart';
import 'package:test/global/store/store.dart';
import 'package:test/pages/home/state.dart';
import 'package:test/styles/common.dart';
import 'package:test/utils/app_constant.dart';
import 'package:test/utils/network.dart';
import 'package:test/utils/screen_adapter.dart';
import 'package:test/utils/storage.dart';

/// 推荐页面UI
class MyView extends StatelessWidget {
  final HomeState state;

  final ViewService viewService;

  final Dispatch dispatch;

  MyView({this.state, this.viewService, this.dispatch}) : super();

  @override
  Widget build(BuildContext context) {
    User user = state.user;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text('测试'),
      ],
    );
  }
}
