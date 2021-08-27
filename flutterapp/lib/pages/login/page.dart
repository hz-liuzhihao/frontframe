import 'package:fish_redux/fish_redux.dart';
import 'package:test/components/state_ticker_provider.dart';

import './effect.dart';
import './state.dart';
import './reducer.dart';
import './view.dart';

class LoginPage extends Page<LoginState, Map<String, dynamic>> {
  @override
  StateWidthTickerProvider<LoginState> createState() =>
      StateWidthTickerProvider<LoginState>();

  LoginPage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
}
