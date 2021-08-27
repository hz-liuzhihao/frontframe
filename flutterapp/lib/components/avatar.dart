import 'package:flutter/cupertino.dart';

class Avatar extends StatelessWidget {
  final double width;

  final double height;

  final double radius;

  final String avatar;

  Avatar({
    Key key,
    this.width,
    this.height,
    this.radius,
    this.avatar,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    BoxDecoration boxDecoration;
    if (this.radius == null) {
      boxDecoration = BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
            image: this.avatar != null && this.avatar.startsWith("images")
                ? AssetImage(this.avatar)
                : NetworkImage(this.avatar),
            fit: BoxFit.cover),
      );
    } else {
      boxDecoration = BoxDecoration(
        borderRadius: BorderRadius.circular(this.radius),
        image: DecorationImage(
            image: this.avatar != null && this.avatar.startsWith("images")
                ? AssetImage(this.avatar)
                : NetworkImage(this.avatar),
            fit: BoxFit.cover),
      );
    }
    return GestureDetector(
      child: Container(
        width: this.width,
        height: this.width,
        decoration: boxDecoration,
      ),
    );
  }
}
