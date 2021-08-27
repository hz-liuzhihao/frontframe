import 'package:flutter/cupertino.dart';

/// Tag组件
class Tag extends StatelessWidget {
  final EdgeInsets padding;

  final String text;

  final Color bgColor;

  final Color fontColor;

  final double fontSize;

  Tag(Key key, this.padding, this.bgColor, this.fontColor, this.fontSize,
      this.text)
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Container(
        color: bgColor,
        child: Text(
          text,
          style: TextStyle(
            color: fontColor,
            fontSize: fontSize,
          ),
        ),
      ),
    );
  }
}
