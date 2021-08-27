import 'package:fish_redux/fish_redux.dart';

import './effect.dart';
import './state.dart';
import './reducer.dart';
import './view.dart';

class WelcomePage extends Page<WelcomeState, Map<String, dynamic>> {
  WelcomePage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
}
