import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/utils/screen_adapter.dart';

class NoData extends StatelessWidget {
  final String text;

  const NoData({this.text = "暂无数据"});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: HYSizeFit.setRpx(200),
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.hourglass_empty,
            color: Colors.grey[400],
            size: HYSizeFit.setRpx(60),
          ),
          SizedBox(
            height: HYSizeFit.setRpx(20),
          ),
          Text(
            this.text,
            style: TextStyle(
                color: Colors.grey[400], fontSize: HYSizeFit.setRpx(26)),
          ),
        ],
      ),
    );
  }
}
