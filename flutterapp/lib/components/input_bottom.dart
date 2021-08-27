import 'package:flutter/material.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnComplete = Future<bool> Function(String value);

class InputBottom extends StatelessWidget {
  final OnComplete onEditingCompleteText;

  final String text;

  final String value;

  final TextEditingController controller = TextEditingController();

  final ValueChanged<String> onChange;

  InputBottom(this.onEditingCompleteText, this.text, this.value,
      {this.onChange}) {
    controller.text = value;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Column(
        children: [
          Expanded(
            child: GestureDetector(
              child: Container(
                color: Colors.transparent,
              ),
              onTap: () {
                if (this.onChange != null) {
                  this.onChange(controller.text);
                }
                Navigator.pop(context);
              },
            ),
          ),
          Container(
            color: Color(0xFFF4F4F4),
            padding: EdgeInsets.all(HYSizeFit.setRpx(16)),
            child: Row(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(color: Colors.white),
                    child: TextField(
                      controller: controller,
                      autofocus: true,
                      style: TextStyle(fontSize: HYSizeFit.setRpx(30)),
                      //设置键盘按钮为发送
                      textInputAction: TextInputAction.send,
                      keyboardType: TextInputType.multiline,
                      onEditingComplete: () async {
                        if (controller.text.isEmpty) {
                          showWarningMsg("评论内容不能为空");
                          return;
                        }
                        //点击发送调用
                        bool isSuccess =
                            await onEditingCompleteText(controller.text);
                        if (isSuccess) {
                          if (this.onChange != null) {
                            this.onChange(controller.text);
                          }
                          Navigator.pop(context);
                        }
                      },
                      decoration: InputDecoration(
                        hintText: text,
                        isDense: true,
                        contentPadding: EdgeInsets.all(HYSizeFit.setRpx(10)),
                        border: const OutlineInputBorder(
                          gapPadding: 0,
                          borderSide: BorderSide(
                            width: 0,
                            style: BorderStyle.none,
                          ),
                        ),
                      ),
                      minLines: 1,
                      maxLines: 5,
                    ),
                  ),
                ),
                Container(
                  height: HYSizeFit.setRpx(60),
                  margin: EdgeInsets.only(left: HYSizeFit.setRpx(16)),
                  child: ElevatedButton(
                    onPressed: () async {
                      if (controller.text.isEmpty) {
                        showWarningMsg("评论内容不能为空");
                        return;
                      }
                      //点击发送调用
                      bool isSuccess =
                          await onEditingCompleteText(controller.text);
                      if (isSuccess) {
                        if (this.onChange != null) {
                          this.onChange(controller.text);
                        }
                        Navigator.pop(context);
                      }
                    },
                    child: Text("发送"),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
