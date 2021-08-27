import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/application.dart';
import 'package:test/components/baselayout.dart';
import 'package:test/pages/home/action.dart';
import 'package:test/pages/home/article/action.dart';
import 'package:test/pages/home/article/view.dart';
import 'package:test/pages/home/category/action.dart';
import 'package:test/pages/home/category/view.dart';
import 'package:test/pages/home/my/view.dart';
import 'package:test/pages/home/recommend/view.dart';
import 'package:test/utils/app_navigator.dart';
import 'package:test/utils/screen_adapter.dart';

import 'state.dart';

Widget buildView(HomeState state, Dispatch dispatch, ViewService viewService) {
  BuildContext context = viewService.context;

  return BaseLayout(
    key: Key('home'),
    body: IndexedStack(
      index: state.currentBottomIndex,
      children: [
        HomeView(
          state: state,
          dispatch: dispatch,
          viewService: viewService,
        ),
        CategoryView(
          state: state,
          dispatch: dispatch,
          viewService: viewService,
        ),
        ArticleView(
          state: state,
          dispatch: dispatch,
          viewService: viewService,
        ),
        MyView(
          state: state,
          dispatch: dispatch,
          viewService: viewService,
        ),
      ],
    ),
    bottomNavigationBar: BottomNavigationBar(
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
        BottomNavigationBarItem(icon: Icon(Icons.category), label: '分类'),
        BottomNavigationBarItem(icon: Icon(Icons.message), label: '知识'),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
      ],
      currentIndex: state.currentBottomIndex,
      type: BottomNavigationBarType.fixed,
      selectedFontSize: HYSizeFit.setRpx(26),
      selectedItemColor: Theme.of(context).primaryColor,
      selectedIconTheme:
          IconThemeData(color: Theme.of(context).primaryColor, size: 26),
      selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold),
      unselectedFontSize: HYSizeFit.setRpx(26),
      unselectedItemColor: Colors.black,
      unselectedIconTheme: IconThemeData(color: Colors.black, size: 24),
      unselectedLabelStyle: TextStyle(fontWeight: FontWeight.normal),
      elevation: 10,
      onTap: (index) {
        if (state.currentBottomIndex == index) {
          return;
        }
        dispatch(HomeActionCreator.changeStatusColor(index));
      },
    ),
    floatingActionButton: FloatingActionButton(
      child: Icon(Icons.add),
      tooltip: "添加测试",
      onPressed: () {
        AppNavigator.pushNamed(context, RouterName.login);
      },
    ),
  );
}
