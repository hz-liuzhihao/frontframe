import 'package:fish_redux/fish_redux.dart';
import 'package:test/components/state_ticker_provider.dart';

import 'effect.dart';
import 'state.dart';
import 'reducer.dart';
import 'view.dart';

class HomePage extends Page<HomeState, Map<String, dynamic>> {
  @override
  StateWidthTickerProvider<HomeState> createState() =>
      StateWidthTickerProvider<HomeState>();

  HomePage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
  // dependencies
  // middleware
}
