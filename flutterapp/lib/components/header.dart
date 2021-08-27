import 'package:flui/flui.dart';
import 'package:flutter/material.dart';
import 'package:test/components/avatar.dart';
import 'package:test/utils/app_constant.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnFollow = void Function();

Widget appHeader({
  Color themeColor,
  String subTitle,
  String title,
}) {
  return AppBar(
    backgroundColor: themeColor,
    title: FLAppBarTitle(
      title: title,
      subtitle: subTitle,
    ),
    centerTitle: true,
  );
}

/// 顶部人信息
Widget peopleHeader(
  BuildContext context, {
  Color themeColor,
  String avatar,
  String name,
  OnFollow onFollow,
}) {
  return AppBar(
    backgroundColor: themeColor,
    title: Row(
      children: [
        Container(
          width: 40,
          alignment: Alignment.center,
          child: AspectRatio(
            aspectRatio: 1,
            child: Avatar(
              avatar: avatar ?? NO_AVATAR_URL,
            ),
          ),
        ),
        Container(
          margin: EdgeInsets.only(left: 5),
          child: Text(name ?? ""),
        ),
        Expanded(
            child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            SizedBox(
              width: HYSizeFit.setRpx(140),
              height: HYSizeFit.setRpx(60),
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStateProperty.all(Theme.of(context).accentColor),
                ),
                onPressed: () {
                  if (onFollow != null) {
                    onFollow();
                  }
                },
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.add,
                      size: HYSizeFit.setRpx(28),
                    ),
                    Text("关注"),
                  ],
                ),
              ),
            ),
          ],
        ))
      ],
    ),
  );
}

/// 搜索头部
Widget searchHeader(
  BuildContext context, {
  Color color,
  bool autoFocus = true,
  GestureTapCallback onSearch,
  TextEditingController controller,
}) {
  return AppBar(
    backgroundColor: color,
    title: Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Container(
            height: HYSizeFit.setRpx(60),
            child: TextField(
              controller: controller,
              cursorColor: Theme.of(context).accentColor,
              textInputAction: TextInputAction.search,
              onEditingComplete: onSearch,
              autofocus: autoFocus,
              decoration: InputDecoration(
                contentPadding: EdgeInsets.only(top: HYSizeFit.setRpx(30)),
                prefixIcon: Icon(Icons.search),
                hintText: "请输入搜索关键字",
                filled: true,
                fillColor: Colors.grey[200],
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    HYSizeFit.setRpx(30),
                  ),
                  borderSide: BorderSide(
                    color: Colors.white,
                    width: HYSizeFit.setRpx(1),
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(
                    HYSizeFit.setRpx(30),
                  ),
                  borderSide: BorderSide(
                    color: Colors.white,
                    width: HYSizeFit.setRpx(1),
                  ),
                ),
              ),
              style: TextStyle(
                fontSize: HYSizeFit.setRpx(24),
              ),
            ),
          ),
        ),
        GestureDetector(
          onTap: onSearch,
          child: Container(
            margin: EdgeInsets.only(
              left: HYSizeFit.setRpx(10),
            ),
            child: Text(
              "搜索",
              style: TextStyle(
                  color: Theme.of(context).accentColor,
                  fontSize: HYSizeFit.setRpx(28)),
            ),
          ),
        ),
      ],
    ),
  );
}
