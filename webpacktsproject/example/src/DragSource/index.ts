import './index.css';
import { IDragContainer, Drag, IDragContext } from '../../../lib';
import { Component, ComponentArgs } from '../../../lib';
import { LineItem } from '../LineItem/index';
import { BorderPosition } from '../../../lib';

export interface DragSourceData {
  id: number;
  name: string;
  describe: string;
  avator: string;
}

export interface DragSourceArgs extends ComponentArgs {
  datas: DragSourceData[];
}

export class DragSource extends Component implements IDragContainer<LineItem> {

  private lineItem: LineItem[];

  private clickItemHandle: (data: JSONObject, event: MouseEvent) => void;

  private name: string;

  private drag: Drag;

  private datas: DragSourceData[];

  public constructor(args: DragSourceArgs) {
    super(args);
    this.group = 'one';
    this.datas = args.datas;
    this.drag = new Drag({
      dom: this.mainDom,
      container: this,
      acceptType: 'one'
    });
  }

  // public canDrag(comp: Component) {
  //   return true;
  // }

  public dragStart(context: IDragContext<LineItem>) {
    console.log('开始拖拽');
  }

  public doDrag(context: IDragContext<LineItem>, position: BorderPosition) {
    if (position) {
      const { datas } = this;
      const sourceComp = context.sourceComp;
      const targetComp = context.targetComp;
      const sourceId = sourceComp.getData().id;
      const targetId = targetComp.getData().id;
      if (sourceId === targetId) {
        return;
      }
      let sourceIndex = 0;
      let targetIndex = 0;
      datas.forEach((item, index) => {
        if (item.id === sourceId) {
          sourceIndex = index;
        } else if (item.id === targetId) {
          targetIndex = index;
        }
      });
      const data = datas.splice(sourceIndex, 1)[0];
      if (position === BorderPosition.T || position === BorderPosition.LT || position === BorderPosition.RT) {
        datas.splice(targetIndex, 0, data);
      } else {
        datas.splice(targetIndex + 1, 0, data);
      }
    }
    this.requestRender();
  }

  // public canDrop(comp: Component) {
  //   return true;
  // }

  public drop(context: IDragContext<LineItem>, position: BorderPosition) {
    console.log('释放');
  }

  public dragEnd(context: IDragContext<LineItem>) {
    console.log('拖拽结束');
  }

  /* @override */
  protected initData(args) {
    this.lineItem = [];
  }

  protected initEvent(args) {
    this.clickItemHandle = this.onClickItem.bind(this);
  }

  protected initDom(args: DragSourceArgs) {
    // TODO
  }

  protected render() {
    const { datas = [], lineItem, mainDom } = this;
    datas.forEach((item, index) => {
      const { id, name, describe, avator } = item;
      let line = lineItem[index];
      if (line) {
        line.setData({
          id,
          title: name,
          describe,
          imgSrc: avator,
          btnText: '拨打电话'
        });
      } else {
        line = lineItem[index] = new LineItem({
          domParent: mainDom,
          data: {
            id,
            title: name,
            describe,
            imgSrc: avator,
            btnText: '拨打电话'
          },
          onClick: this.clickItemHandle,
          group: 'one'
        });
        line.requestRender();
      }
      if (index === datas.length - 1) {
        const items = lineItem.slice(index + 1);
        items.forEach(i => i.setVisible(false));
      }
    });
  }

  private onClickItem(data: JSONObject, event: MouseEvent) {
    console.log(data.name);
  }
}