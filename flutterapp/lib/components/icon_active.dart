import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/utils/screen_adapter.dart';

class IconActive extends StatelessWidget {
  final bool isActive;

  final IconData normalIcon;

  final IconData activeIcon;

  final Color normalColor;

  final Color activeColor;

  final String text;

  final GestureTapCallback onTap;

  const IconActive(
    this.normalIcon, {
    this.normalColor,
    this.isActive = false,
    this.activeIcon,
    this.text = "",
    this.onTap,
    this.activeColor,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          isActive
              ? Icon(
                  activeIcon,
                  color: activeColor,
                )
              : Icon(
                  normalIcon,
                  color: normalColor,
                ),
          Text(
            text,
            style: TextStyle(color: isActive ? activeColor : normalColor),
          ),
        ],
      ),
    );
  }
}
