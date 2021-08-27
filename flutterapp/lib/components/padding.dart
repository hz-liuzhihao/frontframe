import 'package:flutter/material.dart';

/// 获取指定内边距的组件
Widget appPadding({
  double padding,
  Widget child,
}) {
  return Padding(
    padding: EdgeInsets.all(padding),
    child: child,
  );
}

Widget appPaddingLt({
  double paddingLr,
  double paddingTb,
  Widget child,
}) {
  return Padding(
    padding: EdgeInsets.only(
      top: paddingTb,
      bottom: paddingTb,
      left: paddingLr,
      right: paddingLr,
    ),
    child: child,
  );
}
