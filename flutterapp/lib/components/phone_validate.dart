import 'dart:async';

import 'package:flutter/material.dart';
import 'package:test/components/padding.dart';

class PhoneValidate extends StatefulWidget {
  final TextEditingController controller;

  final bool Function() onPress;

  PhoneValidate({Key key, this.controller, this.onPress}) : super(key: key);

  @override
  _PhoneValidateState createState() {
    return _PhoneValidateState(
      controller: this.controller,
      onPress: this.onPress,
    );
  }
}

class _PhoneValidateState extends State<PhoneValidate> {
  int time = 0;

  TextEditingController controller;

  bool Function() onPress;

  _PhoneValidateState({
    this.controller,
    this.onPress,
  });

  startCountDown() {
    final call = (_timer) {
      setState(() {
        if (time < 1) {
          _timer.cancel();
        } else {
          time -= 1;
        }
      });
    };
    Timer.periodic(
        Duration(
          seconds: 1,
        ),
        call);
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Expanded(
          child: appPadding(
              padding: 10,
              child: TextFormField(
                controller: controller,
                decoration: InputDecoration(
                  hintText: '请输入验证码',
                  icon: Icon(Icons.sentiment_very_satisfied),
                ),
                validator: (value) {
                  if (value == null || value == '') {
                    return '验证码不能为空';
                  }
                  return null;
                },
              )),
        ),
        appPadding(
          padding: 10,
          child: RaisedButton(
            onPressed: time > 0
                ? null
                : () {
                    bool result = onPress();
                    if (result) {
                      setState(() {
                        time = 60;
                      });
                      startCountDown();
                    }
                  },
            // ignore: unnecessary_brace_in_string_interps
            child: time == 0 ? Text('获取验证码') : Text("${time}秒后再次获取"),
            color: Theme.of(context).primaryColor,
            textColor: Color(0xffffffff),
            disabledColor: Theme.of(context).disabledColor,
            disabledTextColor: Color(0xffffffff),
          ),
        ),
      ],
    );
  }
}
