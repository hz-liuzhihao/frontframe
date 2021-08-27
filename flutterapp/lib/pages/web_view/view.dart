import 'dart:io';

import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:test/components/header.dart';
import 'package:test/pages/web_view/state.dart';

Widget buildView(
  WebViewState state,
  Dispatch dispatch,
  ViewService viewService,
) {
  if (Platform.isAndroid) {
    WebView.platform = SurfaceAndroidWebView();
  }
  return Scaffold(
    key: Key('webview'),
    appBar: state.title != null && state.title.isNotEmpty
        ? appHeader(
            themeColor: Theme.of(viewService.context).primaryColor,
            title: state.title ?? "无标题",
            subTitle: '')
        : null,
    body: WebView(
      initialUrl: state.url,
      javascriptMode: JavascriptMode.unrestricted,
      navigationDelegate: (NavigationRequest request) async {
        if (request.url.startsWith('js://webview')) {
          return NavigationDecision.prevent;
        } else if (request.url.startsWith("openapp.")) {
          await launch(request.url);
          return NavigationDecision.prevent;
        }
        return NavigationDecision.navigate;
      },
    ),
  );
}
