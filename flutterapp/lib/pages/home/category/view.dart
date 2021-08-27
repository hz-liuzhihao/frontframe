import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:test/application.dart';
import 'package:test/components/cate_view.dart';
import 'package:test/components/custom_tab.dart';
import 'package:test/components/top_search.dart';
import 'package:test/entity/category_data.dart';
import 'package:test/pages/home/category/action.dart';
import 'package:test/pages/home/state.dart';
import 'package:test/type/category_item.dart';
import 'package:test/type/tab_meta.dart';
import 'package:test/utils/app_navigator.dart';
import 'package:test/utils/screen_adapter.dart';

class CategoryView extends StatefulWidget {
  final HomeState state;

  final ViewService viewService;

  final Dispatch dispatch;

  CategoryView({Key key, this.state, this.viewService, this.dispatch})
      : super(key: key);

  @override
  _Category createState() => _Category();
}

/// 推荐页面UI
class _Category extends State<CategoryView>
    with SingleTickerProviderStateMixin {
  _Category() : super();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('测试'),
      ],
    );
  }
}
