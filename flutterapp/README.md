# wecan

## 开发工具

vscode

1. 安装Flutter插件
2. 安装flutter-stylizer插件

android_sdk
flutter安装包
flutter镜像修改

配置环境变量

### 命令

```bash
flutter doctor // 检查依赖
flutter build apk // 构建android包
flutter build apk --no-tree-shake-icons // 构建andoird包有字体时
flutter build ios // 构建ios包
```

### andoird发布

[发布应用](https://flutterchina.club/android-release/)

1. 检查App Manifest
2. 查看构建配置
3. 添加启动图标
4. app签名
5. 在gradle中配置签名
6. 开启混淆/压缩
7. 构建一个发布版apk
8. 在设备上安装发行版apk
9. 将apk发布到应用商店

### ios发布

[发布应用](https://flutterchina.club/ios-release/)


## fish_redux

### action

```dart
import 'package:fish_redux/fish_redux.dart';

enum ***Action { actionName1, actionName2 }

class ***ActionCreator {
  // ****
  static Action actionName1({
    params
  }) {
    return Action(***Action.actionName1, payload: <String, dynamic>{
      params
    });
  }

  // ****
  static Action actionName2({
    params
  }) {
    return Action(***Action.actionName2, payload: <String, dynamic>{
      params
    });
  }
}

```

### state

```dart
class ***State implements GlobalBaseState, Cloneable<***State> {
  @override
  Color themeColor;

  @override
  User user;

  ***State clone() {
    return ***State()
      ..themeColor = themeColor
      ..user = user;
  }
}

***State initState(Map<String, dynamic> args) {
  ***State stateName = new ***State();
  return stateName;
}
```

### effect

```dart
Effect<ForgetPwdState> buildEffect() {
  return combineEffects(
    <Object, Effect<ForgetPwdState>>{
      Lifecycle.initState: _init,
      ForgetPwdAction.actionName: _actionName
    },
  );
}

void _init(Action action, Context<ForgetPwdState> context) {}

void _actionName(Action action, Context<ForgetPwdState> ctx) {
  dynamic payload = action.payload;
  DioUtils.post(
    '',
    ctx.context,
    parameters: {
    },
  ).then((result) {
    if (result["code"] == 200) {
      showSuccessMsg("");
    }
  });
}
```



### reducer

```dart
Reducer<***State> buildReducer() {
  return asReducer(<Object, Reducer<***State>>{});
}
```

## 开发规范

### 内容分区
#### components

应用所有通用组件,与业务无关,不允许存在业务相关代码

#### entity

应用的所有实体类,如User,Good

#### global

应用的全局数据存储区

#### pages

应用的所有页面

#### type

应用的所有枚举或者接口

#### utils

应用的所有工具方法

### 如何开发一个页面

新建一个页面,包含如下文件

#### state.dart

1. 页面所有涉及到的数据定义成state;

#### action.dart

定义这个页面所有需要分发的action, view中调用dispatch方法会用到

action是什么? action是触发effect和reducer的介质。

#### effect.dart

实现buildEffect方法, 绑定定义的action。
1. 处理应用中的所有异步请求在这里触发(注意：数据改变不使用effect,而是使用reducer);

#### reducer.dart

实现buildReducer, 绑定定义的reducer。

1. 处理所有的数据变更的操作;

#### view.dart

页面整个视图的编写

1. 根据state进行渲染
2. 调用dispatch并通过action作为信息介质触发数据变更或者发出异步请求;

#### page.dart

将state,effect,reducer,view结合在一起,形成链路闭环

1. 整个过程的链路都是靠dispatch函数来进行操作;
2. 整个过程的链路都是靠action来作为介质进行修改调整;

### view.dart

编写规范

#### 布局组件

1. 如何布局？
- 上层widget向下层widget传递约束条件;
- 下层widget向上层widget传递大小信息;
- 上层widget决定下层widget的位置;

[单个子元素布局组件](https://flutterchina.club/widgets/layout/)

[多个子元素的布局组件](https://flutterchina.club/widgets/layout/)

[可滚动的布局组件](https://flutterchina.club/widgets/scrolling/)

TabBar

TabBarView

BottomNavigationBar

Drawer

ExpansionPanel

BottomSheet

ListTile

Stepper

Card

DataTable

#### 非布局组件

##### 非输入组件

Image

Text

Icon

RaisedButton

FloatingActionButton

FlatButton

IconButton

PopupMenuButton

ButtonBar

Appbar

FlutterLogo

Placeholder

Divider

LinearProgressIndicator

Chip

Tooltip

##### 输入型组件

TextField

Checkbox

Radio

Switch

Slider

Date

Time Pickers

Form

FormField

RawKeyboardListener

##### 通知类组件

SimpleDialog

AlertDialog

SnackBar

##### 可交互组件

LongPressDraggable

GestureDetector

DragTarget

Dismissible

IgnorePointer

AbsorbPointer

Navigator

Scrollable

##### 样式组件

Padding

Theme

MediaQuery

##### 动画widget

[动画widget](https://flutterchina.club/widgets/animation/)

## 开发规范

实现组件时不要在组件外层包括padding,margin等,而是由外部统一控制