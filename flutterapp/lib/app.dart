import 'package:fish_redux/fish_redux.dart';
import 'package:flutter/material.dart' hide Action, Page;
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:test/application.dart';
import 'package:test/pages/basic_info/page.dart';
import 'package:test/pages/web_view/page.dart';
import 'package:test/pages/welcome/page.dart';
import 'package:test/styles/common.dart';
import 'package:test/utils/screen_adapter.dart';

import 'global/store/state.dart';
import 'global/store/store.dart';
import 'pages/home/page.dart';
import 'pages/login/page.dart';
import 'pages/user/page.dart';
import 'pages/register/page.dart';
import 'pages/forgetpwd/page.dart';
import 'pages/updatepwd/page.dart';

/// 创建应用的根Widget
/// 1. 创建一个简单的路由，并注册页面
/// 2. 对所需要的页面进行和全局Store的连接
/// 3. 对所需要的页面进行AOP的增强
Widget createApp() {
  final AbstractRoutes routes = PageRoutes(
      pages: <String, Page<Object, dynamic>>{
        RouterName.welcome: WelcomePage(),
        RouterName.home: HomePage(),
        RouterName.login: LoginPage(),
        RouterName.user: UserPage(),
        RouterName.register: RegisterPage(),
        RouterName.forgetpwd: ForgetPwdPage(),
        RouterName.updatepwd: UpdatePwdPage(),
        RouterName.appWebview: WebViewPage(),
      },
      visitor: (String path, Page<Object, dynamic> page) {
        if (page.isTypeof<GlobalBaseState>()) {
          page.connectExtraStore<GlobalState>(GlobalStore.store,
              (Object pageState, GlobalState appState) {
            final GlobalBaseState p = pageState;
            if (p.user != appState.user) {
              if (pageState is Cloneable) {
                final Object copy = pageState.clone();
                final GlobalBaseState newState = copy;
                newState.user = appState.user;
                return newState;
              }
            }
            return pageState;
          });
        }
        page.enhancer.append(viewMiddleware: <ViewMiddleware<dynamic>>[
          safetyView<dynamic>()
        ], adapterMiddleware: <AdapterMiddleware<dynamic>>[
          safetyAdapter<dynamic>()
        ], effectMiddleware: <EffectMiddleware<dynamic>>[
          _pageAnalyticsMiddleware<dynamic>()
        ], middleware: <Middleware<dynamic>>[
          logMiddleware<dynamic>(tag: page.runtimeType.toString()),
        ]);
      });

  return MaterialApp(
    title: '性情好',
    localizationsDelegates: [
      GlobalMaterialLocalizations.delegate,
      GlobalWidgetsLocalizations.delegate,
      GlobalCupertinoLocalizations.delegate,
    ],
    supportedLocales: [
      const Locale('zh', 'CN'),
    ],
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      // 主要颜色
      primaryColor: Color(0xfffdbdbd),
      // 次要颜色
      accentColor: Color(0xfff5222d),
      // buttonColor: Color(0xfffdbdbd),
      // focusColor: Color(0xfffdbdbd),
      // highlightColor: Color(0xfffdbdbd),
      // hintColor: Color(0xfffdbdbd),
      // textSelectionTheme: TextSelectionThemeData(
      //   cursorColor: Color(0xfffdbdbd),
      // ),
      // hoverColor: Color(0xfffdbdbd),
      // inputDecorationTheme: InputDecorationTheme(
      //   focusColor: Color(0xfffdbdbd),
      //   hoverColor: Color(0xfffdbdbd),
      // ),
      textTheme: TextTheme(
        caption: TextStyle(
          color: Color(0xff1890ff),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(
            Color(0xfff5222d),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: ButtonStyle(
          textStyle: MaterialStateProperty.all(
            TextStyle(
              color: Color(0xfffdbdbd),
            ),
          ),
        ),
      ),
    ),
    home: routes.buildPage('welcome', {"init": true}),
    onGenerateRoute: (RouteSettings settings) {
      /// 页面跳转时触发
      return MaterialPageRoute<Object>(
        builder: (BuildContext context) {
          /// 初始化屏幕适配器
          HYSizeFit.initialize(context);

          /// 初始化应用样式表
          Styles.initialize(context);

          /// 跳转页面时检测用户是否登录,可以指定页面
          if (GlobalData.getToken() == null || GlobalData.getToken().isEmpty) {
            switch (settings.name) {
              case 'user':
                return routes.buildPage('login', settings.arguments);
            }
          }
          return routes.buildPage(settings.name, settings.arguments);
        },
        settings: settings,
      );
    },
  );
}

/// 简单的Effect AOP
/// 只针对页面的生命周期进行打印
EffectMiddleware<T> _pageAnalyticsMiddleware<T>({String tag = 'redux'}) {
  return (AbstractLogic<dynamic> logic, Store<T> store) {
    return (Effect<dynamic> effect) {
      return (Action action, Context<dynamic> ctx) {
        if (logic is Page<dynamic, dynamic> && action.type is Lifecycle) {
          // print('${logic.runtimeType} ${action.type.toString()} ');
        }
        return effect?.call(action, ctx);
      };
    };
  };
}
