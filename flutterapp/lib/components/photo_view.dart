import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:photo_view/photo_view.dart';
import 'package:test/components/pop_router.dart';

/// 应用内图片预览
class AppPhotoView extends StatelessWidget {
  final String url;

  AppPhotoView(this.url);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0x77bfbfbf),
      body: GestureDetector(
        onTap: () {
          Navigator.of(context).pop();
        },
        child: Container(
          alignment: Alignment.center,
          child: PhotoView(
            imageProvider: NetworkImage(url),
            enableRotation: true,
            heroAttributes: PhotoViewHeroAttributes(tag: "simple"),
            loadingBuilder: (BuildContext context, ImageChunkEvent event) {
              return Text("加载中");
            },
          ),
        ),
      ),
    );
  }
}

void showPreviewPhoto(BuildContext context, String url) {
  Navigator.push(
    context,
    PopRoute(
      child: AppPhotoView(url),
    ),
  );
}
