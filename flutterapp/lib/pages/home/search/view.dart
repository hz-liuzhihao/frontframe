import 'dart:io';

import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/business_component/article_item.dart';
import 'package:test/components/avatar.dart';
import 'package:test/components/form_field.dart';
import 'package:test/components/state_ticker_provider.dart';
import 'package:test/components/top_search.dart';
import 'package:test/pages/home/search/action.dart';
import 'package:test/pages/home/state.dart';
import 'package:test/type/article_type.dart';
import 'package:test/utils/screen_adapter.dart';

class SearchView extends StatefulWidget {
  final HomeState state;

  final ViewService viewService;

  final Dispatch dispatch;

  SearchView({Key key, this.state, this.viewService, this.dispatch})
      : super(key: key);

  @override
  _Search createState() => _Search();
}

/// 推荐页面UI
class _Search extends State<SearchView> with TickerProviderStateMixin {
  TabController tabController;

  _Search() : super();

  @override
  void initState() {
    super.initState();
    tabController = TabController(length: 1, vsync: this);
    tabController.addListener(() {
      widget.dispatch(
        SearchActionCreator.changeSearchIndexAction(tabController.index),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final GlobalKey<FormState> formTestKey = GlobalKey<FormState>();
    return Form(
      key: formTestKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('测试'),
        ],
      ),
    );
  }
}
