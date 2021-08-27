import 'package:flutter/material.dart';
import 'package:test/type/tab_meta.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnTabChange = void Function(TabMeta tabMeta);

class CustomTab extends StatelessWidget {
  final int currentIndex;

  final List<TabMeta> tabs;

  final OnTabChange onTabChange;

  final double height;

  final double width;

  final Axis axis;

  final double fontSize;

  CustomTab({
    Key key,
    this.currentIndex,
    this.tabs,
    this.onTabChange,
    this.height,
    this.width,
    this.axis,
    this.fontSize,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double width = this.width ?? 80;
    double height = this.height ?? 50;
    Axis axis = this.axis ?? Axis.horizontal;
    int currentIndex = this.currentIndex ?? 0;
    return SingleChildScrollView(
      scrollDirection: axis,
      child: Stack(
        children: [
          Flex(
            direction: axis,
            children: tabs
                .asMap()
                .keys
                .map((index) => Container(
                    width: width,
                    height: height,
                    alignment: Alignment.center,
                    child: GestureDetector(
                      key: Key(tabs[index].id.toString()),
                      onTap: () => onTabChange(tabs[index]),
                      child: Text(
                        tabs[index].name,
                        style: TextStyle(
                            color: index == currentIndex
                                ? Colors.black
                                : Colors.grey,
                            fontSize: this.fontSize ?? HYSizeFit.setRpx(24),
                            fontWeight: index == currentIndex
                                ? FontWeight.bold
                                : FontWeight.normal),
                      ),
                    )))
                .toList(),
          ),
          Positioned(
            top: axis == Axis.horizontal ? height - 10 : null,
            left: axis == Axis.vertical ? 0 : null,
            child: AnimatedContainer(
              duration: Duration(milliseconds: 200),
              transform: Matrix4.translationValues(
                  axis == Axis.horizontal
                      ? (currentIndex + 0.5) * width - 15
                      : 0,
                  axis == Axis.vertical
                      ? (currentIndex + 0.5) * height - 15
                      : 0,
                  0),
              child: Container(
                width: axis == Axis.horizontal ? 30 : 5,
                height: axis == Axis.vertical ? 30 : 5,
                decoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.all(Radius.circular(5)),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
