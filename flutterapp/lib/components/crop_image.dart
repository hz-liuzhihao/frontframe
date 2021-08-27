import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:image_crop/image_crop.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/screen_adapter.dart';

class CropImage extends StatefulWidget {
  final File image;

  final double aspectRatio;

  CropImage(
    this.image, {
    this.aspectRatio,
  });

  @override
  _CropImageState createState() => new _CropImageState();
}

class _CropImageState extends State<CropImage> {
  double baseLeft;
  double baseTop;
  double imageWidth;
  double imageScale = 1;
  Image imageView;
  final cropKey = GlobalKey<CropState>();

  Future<void> doCrop(File originalFile, BuildContext context) async {
    final crop = cropKey.currentState;
    final area = crop.area;
    if (area == null) {
      showAppDialog(context, "裁剪失败");
      return;
    }
    await ImageCrop.requestPermissions().then((value) {
      if (value) {
        ImageCrop.cropImage(
          file: originalFile,
          area: area,
        ).then((value) {
          Navigator.pop(context, value);
        }).catchError((e) {
          showAppDialog(context, "裁剪失败");
        });
      } else {
        Navigator.pop(context, originalFile);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    final double width = size.width;
    final double height = size.height;
    return Scaffold(
      body: Container(
        height: height,
        width: width,
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              height: height * 0.85,
              width: width,
              child: Crop.file(
                widget.image,
                key: cropKey,
                alwaysShowGrid: true,
                aspectRatio: widget.aspectRatio,
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: HYSizeFit.setRpx(40), right: HYSizeFit.setRpx(40)),
              child: ElevatedButton(
                onPressed: () {
                  doCrop(widget.image, context);
                },
                child: Text("裁剪"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
