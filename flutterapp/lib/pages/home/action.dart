import 'package:fish_redux/fish_redux.dart';

enum HomeAction {
  changeBottomIndex,
  changeStatusColor
}

class HomeActionCreator {
  /// 修改底部导航栏的索引位置
  static Action changeBottomIndexAction(int index) {
    return Action(HomeAction.changeBottomIndex, payload: index);
  }

  static Action changeStatusColor(int index) {
    return Action(HomeAction.changeStatusColor, payload: index);
  }
}
