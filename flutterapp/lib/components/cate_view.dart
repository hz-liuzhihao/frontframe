import 'package:flutter/cupertino.dart';
import 'package:test/components/avatar.dart';
import 'package:test/type/category_item.dart';

/// icon在顶部的类目
class CateImageTop extends StatelessWidget {
  final String icon;

  final String title;

  final String subTitle;

  final double width;

  final Color mainTitleColor;

  final Color subTitleColor;

  final double padding;

  final double mainTitleSize;

  final double subTitleSize;

  final GestureTapCallback onTap;

  CateImageTop({
    Key key,
    this.icon,
    this.title,
    this.subTitle,
    this.width,
    this.mainTitleColor,
    this.subTitleColor,
    this.padding,
    this.mainTitleSize,
    this.subTitleSize,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double padding = this.padding ?? 20;
    List<Widget> widgets = [
      Padding(
        padding: EdgeInsets.only(
          left: padding,
          right: padding,
          top: padding,
        ),
        child: AspectRatio(
          aspectRatio: 1,
          child: Avatar(
            avatar: icon,
          ),
        ),
      ),
      Container(
        margin: EdgeInsets.only(top: 10),
        child: Text(
          title,
          style: TextStyle(
            color: this.mainTitleColor,
            fontSize: this.mainTitleSize,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    ];
    if (subTitle != null && subTitle.isNotEmpty) {
      widgets.add(
        Text(
          subTitle,
          style: TextStyle(
            color: this.subTitleColor,
            fontSize: this.subTitleSize,
          ),
        ),
      );
    }
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: this.width,
        child: Column(
          children: widgets,
        ),
      ),
    );
  }
}

/// icon在底部的类目
class CateImageBottom extends StatelessWidget {
  final CategoryItem categoryItem;

  final double width;

  final Color mainTitleColor;

  final Color subTitleColor;

  final double padding;

  final double mainTitleSize;

  final double subTitleSize;

  CateImageBottom({
    Key key,
    this.categoryItem,
    this.width,
    this.mainTitleColor,
    this.subTitleColor,
    this.padding,
    this.mainTitleSize,
    this.subTitleSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double padding = this.padding ?? 20;
    List<Widget> widgets = [];
    if (categoryItem.title != null && categoryItem.title.isNotEmpty) {
      widgets.add(
        Container(
          margin: EdgeInsets.only(top: 10),
          child: Text(
            categoryItem.title,
            style: TextStyle(
              color: this.mainTitleColor,
              fontSize: this.mainTitleSize,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      );
    }
    if (categoryItem.subTitle != null && categoryItem.subTitle.isNotEmpty) {
      widgets.add(
        Text(
          categoryItem.subTitle,
          style: TextStyle(
            color: this.subTitleColor,
            fontSize: this.subTitleSize,
          ),
        ),
      );
    }
    widgets.add(
      Padding(
        padding: EdgeInsets.only(
          left: padding,
          right: padding,
          top: padding,
        ),
        child: AspectRatio(
          aspectRatio: 1,
          child: Avatar(
            avatar: categoryItem.icon,
          ),
        ),
      ),
    );

    return Container(
      width: this.width,
      child: Column(
        children: widgets,
      ),
    );
  }
}
