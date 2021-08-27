import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_native_image/flutter_native_image.dart';
import 'package:image_picker/image_picker.dart';
import 'package:test/components/crop_image.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnCallback = void Function(File file, String originPath);

Future<dynamic> showImagePicker(
  BuildContext context,
  OnCallback onCallback, {
  bool isCrop = false,
  double aspectRatio,
}) async {
  showModalBottomSheet(
    context: context,
    builder: (BuildContext context) {
      return BottomSheet(
        onClosing: () {},
        builder: (BuildContext context) {
          return SizedBox(
            height: HYSizeFit.setRpx(330),
            child: Column(
              children: [
                SizedBox(
                  height: HYSizeFit.setRpx(100),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(
                        child: TextButton(
                          onPressed: () {
                            ImagePicker()
                                .pickImage(source: ImageSource.camera)
                                .then(
                              (value) async {
                                if (value == null) {
                                  return;
                                }
                                File file =
                                    await FlutterNativeImage.compressImage(
                                        value.path,
                                        quality: 90);

                                /// 取消底部菜单的弹出
                                Navigator.of(context).pop();

                                /// 如果上传图片需要裁剪则执行裁剪
                                if (isCrop) {
                                  file = await showDialog(
                                    context: context,
                                    builder: (context) => CropImage(
                                      file,
                                      aspectRatio: aspectRatio,
                                    ),
                                  );
                                }
                                if (file != null) {
                                  onCallback(file, value.path);
                                }
                              },
                            );
                          },
                          child: Text(
                            "拍照",
                            style: TextStyle(color: Colors.black),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: HYSizeFit.setRpx(100),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(
                        child: TextButton(
                          onPressed: () {
                            ImagePicker()
                                .pickImage(source: ImageSource.gallery)
                                .then(
                              (value) async {
                                if (value == null) {
                                  return;
                                }
                                File file =
                                    await FlutterNativeImage.compressImage(
                                        value.path,
                                        quality: 90);
                                // 取消底部菜单的弹出
                                Navigator.of(context).pop();
                                if (isCrop) {
                                  file = await showDialog(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return CropImage(
                                          file,
                                          aspectRatio: aspectRatio,
                                        );
                                      });
                                }
                                if (file != null) {
                                  onCallback(file, value.path);
                                }
                              },
                            );
                          },
                          child: Text(
                            "从相册选择",
                            style: TextStyle(color: Colors.black),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      Expanded(
                        child: Divider(
                          height: HYSizeFit.setRpx(30),
                          thickness: HYSizeFit.setRpx(30),
                          color: Colors.grey[100],
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: HYSizeFit.setRpx(100),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Expanded(
                        child: TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: Text(
                            "取消",
                            style: TextStyle(color: Colors.black),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      );
    },
  );
}
