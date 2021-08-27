import 'package:fish_redux/fish_redux.dart';

import './state.dart';

Effect<UserState> buildEffect() {
  return combineEffects(
    <Object, Effect<UserState>>{
      Lifecycle.initState: _init,
    },
  );
}

void _init(Action action, Context<UserState> context) {}
