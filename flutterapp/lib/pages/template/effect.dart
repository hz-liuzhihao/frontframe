import 'package:fish_redux/fish_redux.dart';
import 'package:xqh/entity/user.dart';
import 'package:xqh/global/store/action.dart';
import 'package:xqh/global/store/store.dart';
import 'package:xqh/utils/storage.dart';

import './state.dart';

Effect<TemplatePageState> buildEffect() {
  return combineEffects(
    <Object, Effect<TemplatePageState>>{
      Lifecycle.initState: _init,
    },
  );
}

void _init(Action action, Context<TemplatePageState> context) async {}
