import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/utils/screen_adapter.dart';

/// 提示信息组件
class TipInfo extends StatelessWidget {
  final double height;

  final String tip;

  final Color borderColor;

  final String text;

  final Color tipColor;

  final Color textColor;

  final double fontSize;

  const TipInfo(
      {Key key,
      this.height,
      this.tip,
      this.borderColor,
      this.text,
      this.tipColor,
      this.textColor,
      this.fontSize})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: this.height ?? HYSizeFit.setRpx(45),
      decoration: BoxDecoration(
          border: Border.all(
            color: this.borderColor ?? Colors.red,
          ),
          borderRadius: BorderRadius.all(Radius.circular(HYSizeFit.setRpx(5)))),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            padding: EdgeInsets.only(
              left: HYSizeFit.setRpx(5),
              right: HYSizeFit.setRpx(5),
            ),
            child: Text(
              this.tip,
              style: TextStyle(
                color: this.tipColor ?? Colors.red,
                fontSize: this.fontSize ?? HYSizeFit.setRpx(26),
              ),
            ),
          ),
          VerticalDivider(
            width: HYSizeFit.setRpx(2),
            color: this.borderColor ?? Colors.red,
          ),
          Container(
            padding: EdgeInsets.only(
              left: HYSizeFit.setRpx(10),
              right: HYSizeFit.setRpx(10),
            ),
            child: Text(
              this.text,
              style: TextStyle(
                color: this.textColor ?? Colors.red,
                fontSize: this.fontSize ?? HYSizeFit.setRpx(26),
              ),
            ),
          )
        ],
      ),
    );
  }
}

class BasicInfo extends StatelessWidget {
  final String value;

  final String tip;

  final double width;

  const BasicInfo(this.value, this.tip, {Key key, this.width})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: this.width,
      child: Column(
        children: [
          Text(this.value),
          SizedBox(
            height: HYSizeFit.setRpx(10),
          ),
          Text(
            this.tip,
            style: TextStyle(fontSize: HYSizeFit.setRpx(24)),
          ),
        ],
      ),
    );
  }
}

class BasicItem extends StatelessWidget {
  final IconData icon;

  final String text;

  final Color iconColor;

  final double iconSize;

  final double width;

  final GestureTapCallback onTap;

  const BasicItem(this.icon, this.text,
      {Key key, this.iconColor, this.iconSize, this.width, this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      child: GestureDetector(
        child: Column(
          children: [
            Icon(
              icon,
              size: iconSize,
              color: iconColor,
            ),
            SizedBox(
              height: HYSizeFit.setRpx(10),
            ),
            Text(text),
          ],
        ),
        onTap: onTap,
      ),
    );
  }
}

class ActiveRouteItem extends StatelessWidget {
  final IconData iconData;

  final double iconSize;

  final Color iconColor;

  final String text;

  final GestureTapCallback onTap;

  const ActiveRouteItem(
    this.iconData,
    this.text, {
    Key key,
    this.iconColor,
    this.iconSize,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: HYSizeFit.setRpx(100),
      padding: EdgeInsets.only(left: HYSizeFit.setRpx(10)),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Colors.grey[300],
          ),
        ),
      ),
      child: GestureDetector(
        child: Row(
          children: [
            Icon(
              iconData,
              color: iconColor,
              size: iconSize,
            ),
            SizedBox(
              width: HYSizeFit.setRpx(30),
            ),
            Text(text),
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Icon(Icons.arrow_right),
                ],
              ),
            ),
          ],
        ),
        onTap: onTap,
      ),
    );
  }
}

class AppTag extends StatelessWidget {
  final Color bgColor;

  final String text;

  final Color textColor;

  final GestureTapCallback onTap;

  const AppTag(this.text, {Key key, this.bgColor, this.textColor, this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: this.onTap,
      child: Container(
        height: HYSizeFit.setRpx(50),
        decoration: BoxDecoration(
          color: this.bgColor ?? Colors.grey[200],
          borderRadius: BorderRadius.circular(
            HYSizeFit.setRpx(30),
          ),
        ),
        padding: EdgeInsets.only(
            left: HYSizeFit.setRpx(20),
            right: HYSizeFit.setRpx(20),
            top: HYSizeFit.setRpx(5)),
        child: Text(
          this.text,
          style: TextStyle(
            color: this.textColor ?? Colors.black,
            fontSize: HYSizeFit.setRpx(24),
          ),
        ),
      ),
    );
  }
}
