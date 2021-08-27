import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test/components/crop_image.dart';
import 'package:test/components/image_picker.dart';
import 'package:test/entity/upload_file.dart';
import 'package:test/utils/network.dart';
import 'package:test/utils/screen_adapter.dart';

typedef OnChange<T> = void Function(T value);

/// 上传图片组件
class Upload extends StatelessWidget {
  /// 图片上传限制个数
  final int limit;

  /// 是否在用户选择图片后自动开启裁剪
  final bool isAutoCrop;

  /// 是否开启裁剪
  final bool isOpenCrop;

  /// 是否禁用
  final bool isDisable;

  /// 是否可以预览
  final bool canPreview;

  /// 上传图片组件的当前值
  final List<UploadFile> value;

  /// 图片值改变时触发
  final OnChange<List<UploadFile>> onChange;

  /// 固定照片比例,没有则所有比例
  final double aspectRatio;

  const Upload({
    Key key,
    this.limit = 1,
    this.isAutoCrop = false,
    this.isOpenCrop = true,
    this.isDisable = false,
    this.canPreview = true,
    this.value = const [],
    this.onChange,
    this.aspectRatio,
  }) : super(key: key);

  /// 删除
  void _doDelete(UploadFile uploadFile) {
    List<UploadFile> files = [...value];
    files.remove(uploadFile);
    onChange(files);
  }

  /// 裁剪
  void _doCrop(UploadFile uploadFile, BuildContext context) async {
    File originFile = File(uploadFile.originPath);
    File file = await showDialog(
        context: context,
        builder: (context) {
          return CropImage(
            originFile,
            aspectRatio: aspectRatio,
          );
        });
    if (file == null) {
      return;
    }
    uploadFile.file = file;
    onChange([...value]);
  }

  /// 预览
  void _doPreview(UploadFile uploadFile, BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return SimpleDialog(
          children: [
            uploadFile.file != null
                ? Image.file(uploadFile.file)
                : Image.network(uploadFile.url),
          ],
        );
      },
    );
  }

  /// 构建交互逻辑
  List<Widget> _buildActive(UploadFile uploadFile, BuildContext context) {
    List<Widget> items = [];
    if (canPreview) {
      items.add(
        GestureDetector(
          onTap: () => this._doPreview(uploadFile, context),
          child: Icon(
            Icons.preview,
            color: Colors.white,
          ),
        ),
      );
    }
    if (!isDisable) {
      if (isOpenCrop && uploadFile.file != null) {
        items.add(GestureDetector(
          onTap: () => this._doCrop(uploadFile, context),
          child: Icon(
            Icons.crop,
            color: Colors.white,
          ),
        ));
      }
      items.add(GestureDetector(
        onTap: () => this._doDelete(uploadFile),
        child: Icon(
          Icons.delete,
          color: Colors.white,
        ),
      ));
    }
    return items;
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> widgets = value.map((e) {
      return GestureDetector(
        child: Container(
          width: HYSizeFit.setRpx(200),
          height: HYSizeFit.setRpx(200),
          margin: EdgeInsets.only(right: HYSizeFit.setRpx(20)),
          decoration: BoxDecoration(
            image: DecorationImage(
              image: e.file != null ? FileImage(e.file) : NetworkImage(e.url),
              fit: BoxFit.cover,
            ),
          ),
          alignment: Alignment.center,
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: Color(0x8C8C8CAA),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: _buildActive(e, context),
            ),
          ),
        ),
      );
    }).toList();
    if (value.length < limit) {
      widgets.add(
        GestureDetector(
          onTap: () {
            showImagePicker(
              context,
              (File file, String originPath) {
                MultipartFile multipartFile =
                    MultipartFile.fromFileSync(file.path);
                DioUtils.upload(
                  "/cm/oss/image/upload",
                  FormData.fromMap({"file": multipartFile}),
                  context,
                  onSuccess: (Map result) {
                    UploadFile uploadFile = UploadFile();
                    Map data = result["data"];
                    uploadFile.originPath = originPath;
                    uploadFile.file = file;
                    uploadFile.fileKey = data["fileKey"];
                    uploadFile.fileName = data["fileName"];
                    uploadFile.fileType = data["fileType"];
                    onChange([...value, uploadFile]);
                  },
                );
              },
              isCrop: isAutoCrop,
              aspectRatio: aspectRatio,
            );
          },
          child: Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.grey[300],
                width: HYSizeFit.setRpx(2),
              ),
            ),
            width: HYSizeFit.setRpx(200),
            height: HYSizeFit.setRpx(200),
            child: Icon(
              Icons.add,
              color: Colors.grey[500],
            ),
          ),
        ),
      );
    }
    return Wrap(
      children: widgets,
    );
  }
}
