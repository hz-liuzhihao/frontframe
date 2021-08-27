import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:test/application.dart';
import 'package:test/business_component/article_item.dart';
import 'package:test/components/no_data.dart';
import 'package:test/pages/home/article/action.dart';
import 'package:test/pages/home/state.dart';
import 'package:test/type/article_type.dart';
import 'package:test/utils/app_navigator.dart';
import 'package:test/utils/screen_adapter.dart';

class ArticleView extends StatefulWidget {
  final HomeState state;

  final ViewService viewService;

  final Dispatch dispatch;

  ArticleView({Key key, this.state, this.viewService, this.dispatch})
      : super(key: key);

  @override
  _Article createState() => _Article();
}

/// 推荐页面UI
class _Article extends State<ArticleView>
    with SingleTickerProviderStateMixin, AutomaticKeepAliveClientMixin {

  @override
  bool get wantKeepAlive => true;

  _Article() : super();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    HomeState state = widget.state;
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[300],
      ),
      child: Text("测试"),
    );
  }
}
