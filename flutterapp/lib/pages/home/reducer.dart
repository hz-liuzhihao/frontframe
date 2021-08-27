import 'package:fish_redux/fish_redux.dart';
import 'package:test/pages/home/action.dart';
import 'package:test/pages/home/article/action.dart';
import 'package:test/pages/home/article/reducer.dart';
import 'package:test/pages/home/category/action.dart';
import 'package:test/pages/home/category/reducer.dart';
import 'package:test/pages/home/my/action.dart';
import 'package:test/pages/home/my/reducer.dart';
import 'package:test/pages/home/recommend/action.dart';
import 'package:test/pages/home/recommend/reducer.dart';
import 'package:test/pages/home/search/action.dart';
import 'package:test/pages/home/search/reducer.dart';
import 'package:test/pages/home/state.dart';

Reducer<HomeState> buildReducer() {
  return asReducer(<Object, Reducer<HomeState>>{
    HomeAction.changeBottomIndex: _changeBottomIndex,
  });
}

HomeState _changeBottomIndex(HomeState state, Action action) {
  int index = action.payload;
  return state.clone()..currentBottomIndex = index;
}
