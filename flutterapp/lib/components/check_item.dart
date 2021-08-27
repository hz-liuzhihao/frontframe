import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test/entity/category_data.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnTap = void Function(CategoryData item, bool isCheck);

class CheckItem extends StatelessWidget {
  final CategoryData categoryData;

  final OnTap onTap;

  final bool isCheck;

  const CheckItem(this.categoryData,
      {Key key, this.onTap, this.isCheck = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (onTap != null) {
          onTap(categoryData, !isCheck);
        }
      },
      child: Container(
        color: isCheck ? Theme.of(context).accentColor : Colors.grey[200],
        padding: EdgeInsets.only(
          left: HYSizeFit.setRpx(20),
          right: HYSizeFit.setRpx(20),
          top: HYSizeFit.setRpx(10),
          bottom: HYSizeFit.setRpx(10),
        ),
        child: Text(
          categoryData.name,
          style: TextStyle(color: isCheck ? Colors.white : Colors.black),
        ),
      ),
    );
  }
}
