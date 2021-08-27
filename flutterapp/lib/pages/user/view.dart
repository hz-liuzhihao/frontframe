import 'package:cached_network_image/cached_network_image.dart';
import 'package:fish_redux/fish_redux.dart';
import 'package:flui/flui.dart';
import 'package:flutter/material.dart';
import 'package:test/application.dart';
import 'package:test/components/info_item.dart';
import 'package:test/components/padding.dart';
import 'package:test/entity/user.dart';
import 'package:test/global/store/action.dart';
import 'package:test/global/store/store.dart';
import 'package:test/utils/commons.dart';
import 'package:test/utils/storage.dart';
import './state.dart';

Widget buildView(UserState state, Dispatch dispatch, ViewService viewService) {
  BuildContext context = viewService.context;
  return Scaffold(
    key: Key('user'),
    appBar: AppBar(
      backgroundColor: Theme.of(context).primaryColor,
      title: FLAppBarTitle(
        title: '用户信息',
        subtitle: '',
      ),
      centerTitle: true,
      actions: [
        IconButton(
          icon: Icon(
            const IconData(
              0xe60b,
              fontFamily: 'test',
            ),
            color: Color(0xffffffff),
            size: 18,
          ),
          onPressed: null,
        ),
        IconButton(
            icon: Icon(
              Icons.settings,
              color: Color(0xffffffff),
            ),
            onPressed: null)
      ],
    ),
    body: SingleChildScrollView(
      child: Container(
        child: Column(
          children: [
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: Row(
                children: [
                  Container(
                    width: 50,
                    height: 50,
                    margin: EdgeInsets.only(
                      right: 10,
                    ),
                    child: CachedNetworkImage(
                      imageUrl: state.user.avatar,
                      placeholder: (context, url) => const CircleAvatar(
                        backgroundColor: Colors.amber,
                        radius: 120,
                      ),
                      imageBuilder: (context, imageProvider) => CircleAvatar(
                        backgroundImage: imageProvider,
                        radius: 120,
                      ),
                      errorWidget: (context, url, error) =>
                          Image.asset('images/youke.png'),
                      fit: BoxFit.contain,
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        state.user.name,
                        style: TextStyle(
                          fontSize: 16,
                        ),
                      ),
                      Text(
                        state.user.name,
                        style: TextStyle(
                          fontSize: 12,
                        ),
                      )
                    ],
                  ),
                ],
              ),
            ),
            Divider(
              color: Colors.grey,
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: getPersonInfoItem(
                label: '用户名',
                value: getDefultString(state.user.name),
              ),
            ),
            Divider(
              color: Colors.grey,
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: getPersonInfoItem(
                label: '用户昵称',
                value: getDefultString(state.user.name),
              ),
            ),
            Divider(
              color: Colors.grey,
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: getPersonInfoItem(
                label: '性别',
                value: getDefultString(state.user.sex == 0 ? '男' : '女'),
              ),
            ),
            Divider(
              color: Colors.grey,
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: getPersonInfoItem(
                label: '手机号',
                value: getDefultString(state.user.phone),
              ),
            ),
            Divider(
              color: Colors.grey,
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: getPersonInfoItem(
                label: '邮箱',
                value: getDefultString(state.user.email),
              ),
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 0,
              child: Row(
                children: [
                  Expanded(
                    child: RaisedButton(
                      child: Text('修改密码'),
                      onPressed: () {
                        Navigator.of(context).pushNamed(
                          "updatepwd",
                          arguments: null,
                        );
                      },
                      color: Theme.of(context).primaryColor,
                      textColor: Color(0xffffffff),
                    ),
                  )
                ],
              ),
            ),
            appPaddingLt(
              paddingLr: 10,
              paddingTb: 10,
              child: Row(
                children: [
                  Expanded(
                    child: RaisedButton(
                      child: Text('退出登录'),
                      onPressed: () {
                        getDataBase().then(
                          (value) {
                            Navigator.of(context).pushNamedAndRemoveUntil(
                              'home',
                              (route) => false,
                            );
                            value.setString(userToken, '');
                            value.setString(userId, 'youke');
                            value.setString(userName, '游客');
                            value.setString(userAvatar, 'images/youke.png');
                            User user = User();
                            user.id = 'youke';
                            user.name = '游客';
                            user.avatar = 'images/youke.png';
                            user.token = null;
                            GlobalStore.store.dispatch(
                              GlobalActionCreator.onSaveUser(user),
                            );
                            GlobalData.setToken(null);
                          },
                        );
                      },
                      color: Theme.of(context).errorColor,
                      textColor: Color(0xffffffff),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}
