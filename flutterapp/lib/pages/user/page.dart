import 'package:fish_redux/fish_redux.dart';

import './effect.dart';
import './state.dart';
import './reducer.dart';
import './view.dart';

class UserPage extends Page<UserState, Map<String, dynamic>> {
  UserPage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
}
