import 'package:flutter/material.dart';

Widget getPersonInfoItem({
  String label,
  String comment,
  String value,
  Function onPress,
  bool isIcon = true,
}) {
  return GestureDetector(
    onTap: onPress,
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Text(label),
            comment != null ? Text('($comment)') : Text(''),
          ],
        ),
        Row(
          children: [
            Text(value),
            isIcon ? Icon(Icons.keyboard_arrow_right) : Text(''),
          ],
        )
      ],
    ),
  );
}
