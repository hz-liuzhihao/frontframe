import 'package:fish_redux/fish_redux.dart';
import 'package:test/pages/web_view/state.dart';

Effect<WebViewState> buildEffect() {
  return combineEffects(
    <Object, Effect<WebViewState>>{
      Lifecycle.initState: _init,
    },
  );
}

void _init(Action action, Context<WebViewState> context) {}
