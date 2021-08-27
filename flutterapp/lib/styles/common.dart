import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/utils/screen_adapter.dart';

/// 应用通用样式表
class Styles {
  /// 主标题样式
  static TextStyle mainTitleStyle;

  static TextStyle articleTitleStyle;

  static TextStyle captionStyle;

  static TextStyle contentStyle;

  static TextStyle nameStyle;

  static void initialize(BuildContext context) {
    if (mainTitleStyle == null) {
      mainTitleStyle = TextStyle(
        fontSize: HYSizeFit.setRpx(36),
      );
    }

    if (articleTitleStyle == null) {
      articleTitleStyle = TextStyle(
        fontSize: HYSizeFit.setRpx(40),
        fontWeight: FontWeight.bold,
      );
    }

    if (captionStyle == null) {
      captionStyle = TextStyle(
        fontSize: HYSizeFit.setRpx(26),
        color: Theme.of(context).textTheme.caption.color,
      );
    }

    if (contentStyle == null) {
      contentStyle = TextStyle(
        fontSize: HYSizeFit.setRpx(31),
      );
    }

    if (nameStyle == null) {
      nameStyle = TextStyle(
        fontSize: HYSizeFit.setRpx(31),
        fontWeight: FontWeight.bold,
      );
    }
  }
}
