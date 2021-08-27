import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BaseLayout extends StatelessWidget {
  final Widget body;

  final Widget drawer;

  final Widget bottomNavigationBar;

  final Widget floatingActionButton;

  const BaseLayout(
      {Key key,
      this.body,
      this.drawer,
      this.bottomNavigationBar,
      this.floatingActionButton})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      backgroundColor: Colors.white,
      key: key,
      body: body,
      drawer: drawer,
      bottomNavigationBar: bottomNavigationBar,
      floatingActionButton: floatingActionButton,
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    ));
  }
}
