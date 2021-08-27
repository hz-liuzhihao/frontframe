import 'package:fish_redux/fish_redux.dart';

import './effect.dart';
import './state.dart';
import './reducer.dart';
import './view.dart';

class TemplatePage extends Page<TemplatePageState, Map<String, dynamic>> {
  TemplatePage()
      : super(
          initState: initState,
          effect: buildEffect(),
          reducer: buildReducer(),
          view: buildView,
        );
}
