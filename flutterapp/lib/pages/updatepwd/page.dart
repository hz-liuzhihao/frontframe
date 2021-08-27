import 'package:fish_redux/fish_redux.dart';

import './effect.dart';
import './state.dart';
import './reducer.dart';
import './view.dart';

class UpdatePwdPage extends Page<UpdatePwdState, Map<String, dynamic>> {
  UpdatePwdPage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
}
