import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test/utils/screen_adapter.dart';

/// 展示授权提示框
Future<dynamic> showAppAuthDialog(
  BuildContext context,
  List<String> texts, {
  String title = "提示",
  GestureTapCallback onConfirm,
  GestureTapCallback onCancel,
  String okText = "确认",
  String cancelText = "取消",
}) {
  return showDialog(
    context: context,
    builder: (BuildContext context) {
      return Column(
        children: [
          Container(
            height: HYSizeFit.setRpx(60),
            alignment: Alignment.center,
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: Colors.grey[200],
                  width: HYSizeFit.setRpx(1),
                ),
              ),
            ),
            child: Text(
              title,
              style: TextStyle(
                fontSize: HYSizeFit.setRpx(32),
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Container(
            height: HYSizeFit.setRpx(200),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: Colors.grey[200],
                  width: HYSizeFit.setRpx(1),
                ),
              ),
            ),
            child: ListView.builder(
                itemCount: texts.length,
                itemBuilder: (BuildContext context, int index) {
                  return Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: (index + 1).toString(),
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        TextSpan(
                          text: texts[index],
                          style: TextStyle(
                            fontSize: HYSizeFit.setRpx(32),
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  );
                }),
          ),
          Row(
            children: [
              OutlinedButton(
                onPressed: onCancel,
                child: Text(cancelText),
              ),
              OutlinedButton(
                onPressed: onConfirm,
                child: Text(okText),
              ),
            ],
          )
        ],
      );
    },
  );
}
