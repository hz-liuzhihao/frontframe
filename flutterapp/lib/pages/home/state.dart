import 'dart:ui';

import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:test/entity/good.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/state.dart';
import 'package:test/pages/home/article/state.dart';
import 'package:test/pages/home/category/state.dart';
import 'package:test/pages/home/my/state.dart';
import 'package:test/pages/home/recommend/state.dart';
import 'package:test/pages/home/search/state.dart';
import 'package:test/type/category_item.dart';
import 'package:test/type/tab_meta.dart';

class HomeState extends RecommendState
    with MyState, CategoryState, ArticleState, SearchState
    implements GlobalBaseState, Cloneable<HomeState> {
  @override
  User user;

  int currentBottomIndex = 0;

  @override
  HomeState clone() {
    return HomeState()
      ..user = user
      ..currentBottomIndex = currentBottomIndex;
  }
}

HomeState initState(Map<String, dynamic> args) {
  HomeState homeState = new HomeState();
  return homeState;
}

// class ReportConnector extends ConnOp<PageState, > with ReselectMixin<PageState,> {
// }
