import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test/components/form_comp.dart';
import 'package:test/entity/upload_file.dart';
import 'package:test/utils/screen_adapter.dart';

class UploadForm extends FormField<List<UploadFile>> {
  UploadForm({
    Key key,
    int limit = 1,
    bool isAutoCrop = false,
    bool isOpenCrop = true,
    bool isDisable = false,
    bool canPreview = true,
    double aspectRatio,
    List<UploadFile> initalValue,
    FormFieldSetter<List<UploadFile>> onSaved,
    FormFieldValidator<List<UploadFile>> validator,
  }) : super(
          key: key,
          builder: (FormFieldState<List<UploadFile>> field) {
            void onChangeHandler(List<UploadFile> value) {
              field.didChange(value);
            }

            List<Widget> widgets = [];
            widgets.add(
              Upload(
                value: field.value,
                limit: limit,
                isAutoCrop: isAutoCrop,
                isOpenCrop: isOpenCrop,
                isDisable: isDisable,
                canPreview: canPreview,
                onChange: onChangeHandler,
                aspectRatio: aspectRatio,
              ),
            );
            if (field.errorText != null && field.errorText.isNotEmpty) {
              widgets.add(
                Text(
                  field.errorText,
                  style: TextStyle(
                      color: Theme.of(field.context).errorColor,
                      fontSize: HYSizeFit.setRpx(19)),
                ),
              );
            }

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: widgets,
            );
          },
          initialValue: initalValue ?? [],
          validator: validator,
          onSaved: onSaved,
        );
}
