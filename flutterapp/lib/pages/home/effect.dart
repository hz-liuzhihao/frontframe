import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action;
import 'package:flutter/scheduler.dart';
import 'package:flutter_statusbarcolor/flutter_statusbarcolor.dart';
import 'package:test/components/dialog.dart';
import 'package:test/components/state_ticker_provider.dart';
import 'package:test/pages/home/action.dart';
import 'package:test/pages/home/article/action.dart';
import 'package:test/pages/home/article/effect.dart';
import 'package:test/pages/home/category/action.dart';
import 'package:test/pages/home/category/effect.dart';
import 'package:test/pages/home/recommend/action.dart';
import 'package:test/pages/home/recommend/effect.dart';

import 'state.dart';

Effect<HomeState> buildEffect() {
  return combineEffects(<Object, Effect<HomeState>>{
    Lifecycle.initState: _init,
    HomeAction.changeStatusColor: _changeStatusColor,
  });
}

void _init(Action action, Context<HomeState> ctx) async {
  final TickerProvider tickerProvider =
      ctx.stfState as StateWidthTickerProvider;
}

void _changeStatusColor(Action action, Context<HomeState> state) async {
  int index = action.payload;
  if (index == 0 || index == 1 || index == 2) {
    await FlutterStatusbarcolor.setStatusBarColor(Colors.white);
    await FlutterStatusbarcolor.setNavigationBarColor(Colors.black);
  } else {
    await FlutterStatusbarcolor.setStatusBarColor(Color(0xfffdbdbd));
    await FlutterStatusbarcolor.setNavigationBarColor(Colors.black);
  }
  state.dispatch(HomeActionCreator.changeBottomIndexAction(index));
}
