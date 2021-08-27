import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test/utils/screen_adapter.dart';

const List<Color> _colors = [
  Color(0xfff5222d),
  Color(0xfffdbdbd),
  Color(0xffffa940)
];

typedef OnTap = void Function(String keyword);

class SearchHot extends StatelessWidget {
  final List<String> keywords;

  final OnTap onTap;

  const SearchHot(this.keywords, {Key key, this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    int index = 0;
    return Column(
        children: keywords.map((item) {
      index++;
      return GestureDetector(
        onTap: () {
          if (this.onTap != null) {
            this.onTap(item);
          }
        },
        child: Container(
          height: HYSizeFit.setRpx(80),
          child: Row(
            children: [
              Text(
                index.toString(),
                style: TextStyle(
                  color: index > _colors.length
                      ? Colors.grey[400]
                      : _colors[index - 1],
                ),
              ),
              SizedBox(
                width: HYSizeFit.setRpx(40),
              ),
              Expanded(
                child: Text(item),
              ),
            ],
          ),
        ),
      );
    }).toList());
  }
}
