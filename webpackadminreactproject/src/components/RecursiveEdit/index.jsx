import React, { PureComponent } from 'react';
import { Breadcrumb, Menu, Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';

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
    renderItem: PropTypes.func,
    add: PropTypes.func,
    width: PropTypes.number,
    editDisabled: PropTypes.bool,
    deleteDisabled: PropTypes.bool,
    onEdit: PropTypes.func,
    onDel: PropTypes.func,
  }

  static defaultProps = {
    datas: [],
    paths: [],
    width: 110,
    editDisabled: false,
    deleteDisabled: false,
  }

  constructor(props) {
    super(props);
    this.item = null;
    this.state = {
      menuVisible: false,
      menuX: 0,
      menuY: 0,
    }
  }

  /**
   * 渲染面包屑
   */
  renderBread() {
    const { paths = [], jump } = this.props;
    return paths.map((item, index) => {
      const props = {};
      if (index < paths.length - 1) {
        props.onClick = function () {
          jump && jump(item);
        }
        props.className = styles.breadItem;
      }
      return <Breadcrumb.Item key={index} {...props}>
        {item.name}
      </Breadcrumb.Item>;
    })
  }

  /**
   * 改变菜单状态
   */
  changeMenu = (e) => {
    this.setState({
      menuVisible: false,
    }, () => {
      document.removeEventListener('click', this.changeMenu);
    });
  }

  /**
   * 右键点击事件
   * @param {*} e 
   * @param {*} item
   */
  doContextMenu = (e, item) => {
    e.preventDefault();
    this.item = item;
    const { clientX, clientY } = e;
    this.setState({
      menuVisible: true,
      menuX: clientX,
      menuY: clientY
    }, () => {
      document.addEventListener('click', this.changeMenu);
    });

  }

  /**
   * 处理操作
   * @param {*} e 
   */
  handleOperate = (e) => {
    const { key } = e || {};
    const { onEdit, onDel } = this.props;
    if (key == 'edit') {
      onEdit && onEdit(this.item);
    } else {
      onDel && onDel(this.item);
    }
  }

  render() {
    const { datas, renderItem, add, width, editDisabled, deleteDisabled, jump } = this.props;
    const { menuVisible, menuX, menuY } = this.state;
    return <div className={styles.container}>
      {menuVisible && <Menu className={styles.menu} style={{
        left: `${menuX}px`,
        top: `${menuY}px`,
      }} onClick={this.handleOperate} mode='vertical'>
        <Menu.Item key="edit" disabled={editDisabled} icon={<EditOutlined />}>
          编辑
        </Menu.Item>
        <Menu.Item key="delete" disabled={deleteDisabled} icon={<DeleteOutlined />}>
          删除
        </Menu.Item>
      </Menu>}
      <Breadcrumb style={{ marginLeft: '15px', marginTop: '15px' }}>
        {this.renderBread()}
      </Breadcrumb>
      <div className={styles.itemsContainer}>
        {datas.map((item, index) => <div key={index} style={{ width: `${width}px` }} className={styles.item}><div className={styles.content} onDoubleClick={(e) => jump && jump(item)} onContextMenu={(e) => this.doContextMenu(e, item)}>{renderItem && renderItem(item)}</div></div>)}
        <div style={{ width: `${width}px` }} className={classNames(styles.item, styles.add)}>
          <div className={styles.content}>
            <PlusOutlined className={styles.addIcon} onClick={add} />
          </div>
        </div>
      </div>
    </div>;
  }
}