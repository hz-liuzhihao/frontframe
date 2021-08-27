import 'package:flutter/material.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/screen_adapter.dart';

/// 顶部搜索
class TopSearch extends StatelessWidget {
  final String placeHolder;

  final String imageUrl;

  final GestureTapCallback onTap;

  TopSearch({Key key, this.placeHolder, this.imageUrl, this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(HYSizeFit.setRpx(10)),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: HYSizeFit.setRpx(100),
            height: HYSizeFit.setRpx(60),
            child: getImage(this.imageUrl),
            margin: EdgeInsets.only(right: HYSizeFit.setRpx(10)),
          ),
          Expanded(
            child: GestureDetector(
              onTap: onTap,
              child: Container(
                height: HYSizeFit.setRpx(50),
                padding: EdgeInsets.only(
                  left: HYSizeFit.setRpx(10),
                  right: HYSizeFit.setRpx(10),
                ),
                margin: EdgeInsets.only(
                  right: HYSizeFit.setRpx(20),
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: Colors.grey[200],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      this.placeHolder,
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: HYSizeFit.setRpx(20),
                      ),
                    ),
                    Icon(
                      Icons.search,
                      color: Colors.grey,
                      size: HYSizeFit.setRpx(30),
                    ),
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}

class TopSearchInput extends StatelessWidget {
  final double width;

  final double height;

  final String placeholder;

  final GestureTapCallback onTap;

  TopSearchInput({
    Key key,
    this.width,
    this.height,
    this.placeholder,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: this.width,
      height: this.height,
      child: Padding(
        child: GestureDetector(
          onTap: onTap,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: Colors.grey[200],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.search,
                  color: Colors.grey,
                ),
                Text(
                  this.placeholder,
                  style: TextStyle(color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
        padding: EdgeInsets.only(
            left: HYSizeFit.setRpx(20),
            right: HYSizeFit.setRpx(20),
            top: HYSizeFit.setRpx(10),
            bottom: HYSizeFit.setRpx(10)),
      ),
    );
  }
}

class CommentInput extends StatelessWidget {
  final double width;

  final double height;

  final String placeholder;

  final MainAxisAlignment mainAxisAlignment;

  final GestureTapCallback onComment;

  CommentInput(
      {Key key,
      this.width,
      this.height,
      this.placeholder,
      this.mainAxisAlignment = MainAxisAlignment.start,
      this.onComment})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onComment,
      child: Container(
        width: width,
        height: height,
        alignment: Alignment.centerLeft,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: Colors.grey[200],
        ),
        child: Padding(
          padding: EdgeInsets.only(
              left: HYSizeFit.setRpx(20),
              right: HYSizeFit.setRpx(20),
              top: HYSizeFit.setRpx(10),
              bottom: HYSizeFit.setRpx(10)),
          child: Text(
            placeholder,
            style: TextStyle(color: Colors.grey),
          ),
        ),
      ),
    );
  }
}
