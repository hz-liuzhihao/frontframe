import 'dart:io';

import 'package:common_utils/common_utils.dart';
import 'package:device_info/device_info.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:fluwx/fluwx.dart';
import 'package:umeng/umeng.dart';
import 'package:test/application.dart';

typedef Callback = void Function();

Map globalData = new Map();

/// 获取一张图片控件
Image getImage(String imageUrl, {double scale = 1, String emptyImage}) {
  if (imageUrl == null || imageUrl.isEmpty) {
    return Image.asset(emptyImage ?? 'images/youke.png');
  }
  if (imageUrl.startsWith("images")) {
    return Image.asset(
      imageUrl,
      scale: scale,
    );
  } else {
    return Image.network(
      imageUrl,
      scale: scale,
      loadingBuilder:
          (BuildContext context, Widget widget, ImageChunkEvent event) {
        if (event == null) {
          return widget;
        }
        return Center(
          child: Text("加载中"),
        );
      },
    );
  }
}

ImageProvider<dynamic> getImageProvider(String imageUrl) {
  if (imageUrl == null || imageUrl.isEmpty) {
    return AssetImage('images/youke.png');
  }
  if (imageUrl.startsWith("images")) {
    return AssetImage(imageUrl);
  } else {
    return NetworkImage(imageUrl);
  }
}

String getDefultString(String data) {
  return data ?? '';
}

/// 弹框提示
void showAppDialog(BuildContext context, String text) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        content: Text(text),
        actions: [
          FlatButton(
            child: Text('确定'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          )
        ],
      );
    },
  );
}

/// 显示成功消息
void showSuccessMsg(String text) {
  Fluttertoast.showToast(
    msg: text,
    backgroundColor: Color(0xff339933),
    textColor: Color(0xffffffff),
    gravity: ToastGravity.TOP,
  );
}

/// 警告信息提示
void showWarningMsg(String text) {
  Fluttertoast.showToast(
    msg: text,
    backgroundColor: Color(0xfffdbdbd),
    textColor: Color(0xffffffff),
    gravity: ToastGravity.TOP,
  );
}

/// 错误信息提示
void showErrorMsg(String text) {
  Fluttertoast.showToast(
    msg: text,
    backgroundColor: Colors.red[400],
    textColor: Color(0xffffffff),
    gravity: ToastGravity.TOP,
  );
}

/// 格式化时间轴
String formatTimeLine(int mills) {
  return TimelineUtil.format(mills, locale: "zh", dayFormat: DayFormat.Full);
}

/// 获取当前时间戳
int currentTimeMillis() {
  return DateTime.now().millisecondsSinceEpoch;
}
