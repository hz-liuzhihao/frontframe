import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Divider, Checkbox, Button } from 'antd';
import styles from './index.less';

/**
 * 选择树组件
 */
export default class CheckTree extends PureComponent {

  static propTypes = {
    datas: PropTypes.array,
    value: PropTypes.array,
    isRecordPid: PropTypes.bool
  }

  static defaultProps = {
    datas: [],
    value: [],
    isRecordPid: false
  }

  constructor(props) {
    super(props);
    const { datas = [] } = props;
    this.checkMap = {};
    this.idMap = {};
    this.parseIdMap(JSON.parse(JSON.stringify(datas)), this.idMap);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { datas } = this.props;
    const { datas: nextDatas = [] } = nextProps;
    if (nextDatas !== datas) {
      this.idMap = {};
      this.parseIdMap(JSON.parse(JSON.stringify(nextDatas)), this.idMap);
    }
  }

  /**
   * 解析数据
   * @param {*} datas 
   * @param {*} result 
   */
  parseData(data, result, deep, parent) {
    const row = [];
    row.deep = deep;
    if (data.children instanceof Array) {
      const { children, ...other } = data;
      const linkItem = this.idMap[other.id];
      other.isChildren = true;
      other.checked = linkItem.children.every(item => this.checkMap[item.id]);
      // 子元素如果选中了则调用父级传给的回调方法
      function step(checked) {
        // 已经设置过不能再被覆盖
        if (!other.indeterminate) {
          other.indeterminate = checked;
        }
        parent && parent(checked);
      }
      row.push(other);
      data.children.reverse().forEach(item => this.parseData(item, result, deep + 1, step));
    } else {
      data.checked = this.checkMap[data.id];
      // 在最后一个元素被选中时触发
      parent && parent(data.checked);
      row.push(data);
    }
    // 当深度一致时说明是同一行,压在一起,且上一个元素没有子元素才可以
    if (result[0] && result[0].deep == row.deep && !result[0][0].isChildren) {
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
    const { datas = [], value = [] } = this.props;
    const tempDatas = JSON.parse(JSON.stringify(datas));
    const checkMap = {};
    value.forEach(item => (checkMap[item] = true));
    this.checkMap = checkMap;
    return tempDatas.map(item => {
      const result = [];
      this.parseData(item, result, 0);
      return result;
    });
  }

  /**
   * 解析idMap
   * @param {*} datas 
   * @param {*} idMap 
   * @param {*} parentId 
   */
  parseIdMap(datas, idMap, parentId) {
    datas.forEach(item => {
      if (parentId) {
        item.parentId = parentId;
      }
      idMap[item.id] = item;
      if (item.children) {
        this.parseIdMap(item.children, idMap, item.id);
      }
    });
  }

  /**
   * 选中子元素
   * @param {*} datas 
   * @param {*} value 
   * @param {*} checked
   */
  checkChildren(datas, value, checked) {
    datas.forEach(item => {
      const index = value.indexOf(item.id);
      if (index > -1 && !checked) {
        value.splice(index, 1);
      } else if (index < 0 && checked) {
        value.push(item.id);
      }
      if (item.children) {
        this.checkChildren(item.children, value, checked);
      }
    });
  }

  /**
   * 选中父元素
   * @param {*} id 当前元素id 
   * @param {*} value 
   * @param {*} checked 
   */
  checkParent(id, value) {
    const idMap = this.idMap;
    const linkItem = idMap[id];
    const parentId = linkItem.parentId;
    const { isRecordPid } = this.props;
    if (!parentId) {
      return;
    }
    const linkParentItem = idMap[parentId];
    const allChecked = (linkParentItem.children || []).every(item => value.indexOf(item.id) > -1);
    const halfChecked = (linkParentItem.children || []).some(item => value.indexOf(item.id) > -1);
    // 全选或者可以半选加id则进行半选择
    if (allChecked || (halfChecked && isRecordPid)) {
      value.push(parentId);
      this.checkParent(parentId, value);
    } else {
      const index = value.indexOf(parentId);
      if (index > -1) {
        value.splice(index, 1);
      }
      this.checkParent(parentId, value);
    }
  }

  /**
   * 数据改变后
   * @param {*} item 
   * @param {*} checked 
   */
  doChange = (item, checked) => {
    const { onChange } = this.props;
    const idMap = this.idMap;
    const { id } = item || {};
    const linkItem = idMap[id];
    const { value = [] } = this.props;
    const newValue = [...value];
    if (checked) {
      // 选中元素
      newValue.push(id);
      // 选中子元素
      if (linkItem.children) {
        this.checkChildren(linkItem.children, newValue, checked);
      }
      // 检查父元素情况
      this.checkParent(id, newValue, checked);
    } else {
      // 不选中元素
      const index = newValue.indexOf(id);
      if (index > -1) {
        newValue.splice(index, 1);
      }
      // 反选子元素
      if (linkItem.children) {
        this.checkChildren(linkItem.children, newValue, checked);
      }
      // 检查父元素情况
      this.checkParent(id, newValue, checked);
    }
    onChange && onChange(newValue);
  }

  render() {
    const transformData = this.transformData();
    return <div className={styles.checkTreeContainer}>
      <div className={styles.header}>
        <span>已选中</span>
        <Button type='link'>全选</Button>
      </div>
      {transformData.map((item, index) => {
        return <div key={index} className={styles.container}><Divider style={{ margin: '10px 0' }} /><div className={styles.checkContainer}>
          {item.map((ite, index) => <div key={index} style={{ paddingLeft: `${ite.deep * 24}px` }}>
            {ite.map(it => <Checkbox className={styles.checkTreeBox} disabled={it.disabled} indeterminate={!it.checked && it.indeterminate} checked={it.checked} key={it.id} onChange={(event) => this.doChange(it, event.target.checked)}>{it.name}</Checkbox>)}
          </div>)}
        </div>
        </div>
      })}
    </div>
  }
}