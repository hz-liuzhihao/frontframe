import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/components/cate_view.dart';
import 'package:test/type/category_item.dart';
import 'package:test/utils/screen_adapter.dart';

class TabRecommend extends StatefulWidget {
  final List<String> tabs;

  final List<List<CategoryItem>> items;

  TabRecommend({Key key, this.tabs, this.items}) : super(key: key);

  @override
  _TabRecommendState createState() => _TabRecommendState();
}

class _TabRecommendState extends State<TabRecommend>
    with SingleTickerProviderStateMixin {
  TabController tabController;

  _TabRecommendState() : super() {
    tabController = new TabController(length: 2, vsync: this);
  }

  @override
  void initState() {
    super.initState();
  }

  Widget buildGrid(List<CategoryItem> list) {
    return Wrap(
      alignment: WrapAlignment.spaceAround,
      children: list.map((item) {
        return Container(
          width: HYSizeFit.setRpx(180),
          child: CateImageTop(
            icon: item.icon,
            title: item.title,
            subTitle: item.subTitle,
            mainTitleSize: HYSizeFit.setRpx(26),
            padding: HYSizeFit.setRpx(40),
          ),
        );
      }).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return this.buildGrid(widget.items[0]);
  }
}
