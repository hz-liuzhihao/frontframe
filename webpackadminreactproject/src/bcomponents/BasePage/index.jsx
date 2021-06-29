import { PureComponent } from "react";
import { GLOBAL_CONFIG } from "../../utils/config";

/**
 * 页面的基类
 */
export default class BasePage extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    if (typeof this.getTitle == 'function') {
      dispatch({
        type: `${GLOBAL_CONFIG.global}/save`,
        payload: {
          title: this.getTitle()
        }
      });
    }
  }
}