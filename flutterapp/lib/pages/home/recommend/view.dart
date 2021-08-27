import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:test/application.dart';
import 'package:test/business_component/good_item.dart';
import 'package:test/components/cate_view.dart';
import 'package:test/components/no_data.dart';
import 'package:test/components/top_search.dart';
import 'package:test/pages/home/recommend/action.dart';
import 'package:test/pages/home/state.dart';
import 'package:test/utils/app_navigator.dart';
import 'package:test/utils/screen_adapter.dart';

class HomeView extends StatefulWidget {
  final HomeState state;

  final ViewService viewService;

  final Dispatch dispatch;

  HomeView({Key key, this.state, this.viewService, this.dispatch})
      : super(key: key);

  @override
  _Home createState() => _Home();
}

/// 推荐页面UI
class _Home extends State<HomeView>
    with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin {
  List<GestureDetector> imgs = [];

  @override
  bool get wantKeepAlive => true;

  _Home() : super();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Column(
      children: [
        Text('测试'),
      ],
    );
  }
}
