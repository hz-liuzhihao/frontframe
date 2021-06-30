import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Checkbox, Button } from 'antd';
import styles from './index.less';

/**
 * 权限树组件
 */
export default class CheckTree extends PureComponent {

  static propTypes = {
    datas: PropTypes.array,
    checkIds: PropTypes.array
  }

  static defaultProps = {
    datas: [],
    checkIds: [],
  }

  /**
   * 解析数据
   * @param {*} datas 
   * @param {*} result 
   */
  parseData(data, result, deep) {
    const row = [];
    row.deep = deep;
    if (data.children instanceof Array) {
      const { children, ...other } = data;
      row.push(other);
      data.children.reverse().forEach(item => this.parseData(item, result, deep + 1));
    } else {
      row.push(data);
    }
    // 当深度一致时说明是同一行,压在一起
    if (result[0] && result[0].deep == row.deep) {
      result[0].unshift(row[0]);
    } else {
      result.unshift(row);
    }
  }

  /**
   * 数据转换
   * @returns 
   */
  transformData() {
    const { datas = [] } = this.props;
    return datas.map(item => {
      const result = [];
      this.parseData(item, result, 0);
      return result;
    });
  }

  doChange = (item) => {

  }

  render() {
    const { datas } = this.props;
    const transformData = this.transformData();
    return <div className={styles.checkTreeContainer}>
      <div className={styles.header}>
        <span>已选中</span>
        <Button type='link'>全选</Button>
      </div>
      {transformData.map((item, index) => {
        return <div key={index}>
          <Divider />
          {item.map((ite, index) => <div key={index} style={{ paddingLeft: `${ite.deep * 20}px` }}>
            {ite.map(it => <Checkbox key={it.id} onChange={this.doChange}>{it.name}</Checkbox>)}
          </div>)}
        </div>
      })}
    </div>
  }
}