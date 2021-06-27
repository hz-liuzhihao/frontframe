import React, { PureComponent } from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';

/**
 * 权限编辑器
 * 10
 * 1010
 * 101010
 * 101010100
 */
export default class RecursiveEdit extends PureComponent {

  static propTypes = {
    datas: PropTypes.array,
    paths: PropTypes.array,
    jump: PropTypes.func,
  }

  static defaultProps = {
    datas: [],
    paths: []
  }

  /**
   * 渲染面包屑
   */
  renderBread() {
    const { paths, jump } = this.props;
    return paths.map((item, index) => {
      const props = {};
      if (index == paths.length - 1) {
        props.onClick = function () {
          jump && jump(item);
        }
      }
      return <Breadcrumb.Item {...props}>
        {item.name}
      </Breadcrumb.Item>;
    })
  }

  render() {
    const { datas, renderItem } = this.props;
    return <div>
      <Breadcrumb>
        {this.renderBread()}
      </Breadcrumb>
      <div>
        {datas.map(item => <div>{renderItem && renderItem(item)}</div>)}
      </div>
    </div>;
  }
}