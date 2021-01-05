import { throttle, findCompByDom, getPositionByEvent } from '../util/utils';
import { Component } from '../component/Component';
import { BorderPosition } from '../util/enum';
/**
 * 拖拽上下文数据类型
 */
export interface IDragContext<T extends Component> {
  /**
   * 拖拽容器的实例，拖拽容器和拖拽源容器可能相同
   */
  sourceContainer?: IDragContainer<T>;
  /**
   * 放置容器的实例,拖拽源容器和放置容器可能相同
   */
  targetContainer?: IDragContainer<T>;
  /**
   * 鼠标原生事件
   */
  event?: MouseEvent;
  /**
   * 位于当前组件的相对位置,用于排序等
   */
  compPosition?: AppPosition;
  /**
   * 预览dom
   */
  previewDom?: HTMLElement;

  /**
   * 是否正在拖拽
   */
  isDragging?: boolean;

  /**
   * 是否开始拖拽
   */
  isStartDrag?: boolean;

  /**
   * 拖拽源组件
   */
  sourceComp?: T;

  /**
   * 拖拽目标组件
   */
  targetComp?: T;
}

export interface IDragContainer<T extends Component> {
  /**
   * 开始拖拽
   */
  dragStart?: (context: IDragContext<T>) => void;

  /**
   * 拖拽中
   */
  doDrag?: (context: IDragContext<T>, position?: BorderPosition) => void;

  /**
   * 是否可以拖拽,默认是true
   */
  canDrag?: (comp: Component) => boolean;

  /**
   * 进行放置时调用的回调函数
   */
  drop?: (context: IDragContext<T>, position: BorderPosition) => void;

  /**
   * 是否可以放置,默认为false
   */
  canDrop?: (comp: Component) => boolean;

  /**
   * 拖拽结束时回调函数
   */
  dragEnd?: (context: IDragContext<T>) => void;

  /**
   * 获取拖拽预览dom
   */
  getPreviewDom?: (context: IDragContext<T>) => HTMLElement;
}

/**
 * 拖拽上下文
 */
const DragContext: IDragContext<Component> = {};

export interface DragArgs {
  dom: HTMLElement;

  /**
   * 拖拽容器接口,必须实现IDragContainer接口
   */
  container: IDragContainer<any>;

  /**
   * 拖拽的数据层类型或者放置的数据层类型,针对组件非容器,没有的话则找dom最近的数据层
   */
  acceptType?: any;
}

/**
 * 鼠标是否在某个dom容器类
 * @param container 
 * @param event 
 */
function mouseIsInContainer(container: HTMLElement, event: MouseEvent) {
  const boundingRect = container.getBoundingClientRect();
  const x = boundingRect.x;
  const y = boundingRect.y;
  const x1 = boundingRect.right;
  const y1 = boundingRect.bottom;
  const clientX = event.clientX;
  const clientY = event.clientY;
  if (clientX > x && clientX < x1 && clientY > y && clientY < y1) {
    return true;
  }
  return false;
}

/**
 * 拖拽器
 */
export class Drag {

  private dragDom: HTMLElement;

  private lastPosition: AppPosition;

  private container: IDragContainer<Component>

  private throttleMouseMove: (event: MouseEvent) => void;

  private acceptType: string;

  public constructor(args: DragArgs) {
    this.dragDom = args.dom;
    this.container = args.container;
    this.acceptType = args.acceptType;
    this.throttleMouseMove = throttle(20, this.mouseMove);
    this.initListenEvent();
  }

  /**
   * 销毁注册的事件
   */
  public destroy() {
    const { dragDom } = this;
    dragDom.removeEventListener('mousedown', this.mouseDown);
  }

  /**
   * 鼠标按下时进行触发
   * @param event 
   */
  private mouseDown = (event: MouseEvent) => {
    if (DragContext.isDragging || DragContext.isStartDrag) {
      return;
    }
    const target = event.target as HTMLElement;
    const { acceptType, container, dragDom } = this;
    const comp = findCompByDom<Component>(target, acceptType);

    // 鼠标点击时检测当前组件是否可以进行拖拽
    if (!container.canDrag || container.canDrag(comp)) {
      // 记录第一次点击的位置,便于后面拖动
      this.lastPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      DragContext.isStartDrag = true;

      // 鼠标按下后且元素可以拖拽则当前就位拖拽源和放置源
      DragContext.sourceContainer = this.container;
      DragContext.targetContainer = this.container;
      DragContext.event = event;
      DragContext.sourceComp = comp;

      // 预览dom进行锁定
      const previewDom = container.getPreviewDom && container.getPreviewDom(DragContext);
      const compMainDom = comp.getMainDom();
      let cloneDom: HTMLElement;

      // 如果是预览dom就直接放在鼠标中间即可,如果是clone的可拖拽的dom则需要计算鼠标在组件中的位置
      if (previewDom) {
        cloneDom = previewDom;
        cloneDom.style.transform = 'translate(-50%, -50%)';
      } else {
        cloneDom = (previewDom || compMainDom).cloneNode(true) as HTMLElement;
        const boundingRect = compMainDom.getBoundingClientRect();
        cloneDom.style.transform = `translate(-${event.clientX - boundingRect.x}px, -${event.clientY - boundingRect.y}px)`;
      }
      cloneDom.classList.add('dragging-dom');

      DragContext.previewDom = cloneDom;

      // 绑定移动和放开的鼠标事件
      document.addEventListener('mousemove', this.throttleMouseMove);
      document.addEventListener('mouseup', this.mouseUp);

      // 一旦拖拽就阻止冒泡和默认事件发生
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * 鼠标进入容器时
   * @param event 
   */
  private mouseEnter = (event: MouseEvent) => {
    const { isDragging } = DragContext;
    if (!isDragging) {
      return;
    }
    // 当鼠标移入源时,当前源则为以后的放置源
    DragContext.targetContainer = this.container;
  }

  /**
   * 容器离开容器时
   * @param event 
   */
  private mouseLeave = (event: MouseEvent) => {
    const { isDragging } = DragContext;
    if (!isDragging) {
      return;
    }
    // 当鼠标离开源时一定要把targetContainer置为空
    DragContext.targetContainer = null;
  }

  /**
   * 鼠标移动时开始触发
   * 1. 移动可能发生在拖拽源或者放置源
   * @param event 
   */
  private mouseMove = (event: MouseEvent) => {
    if (!DragContext.isStartDrag) {
      return;
    }
    const { previewDom, sourceContainer } = DragContext;
    const { container, lastPosition, acceptType } = this;
    DragContext.event = event;
    const targetContainer = DragContext.targetContainer;
    const currentPosition = {
      x: event.clientX,
      y: event.clientY,
    };
    // x轴偏移距离
    const distanceX = currentPosition.x - lastPosition.x;
    // y轴偏移距离
    const distanceY = currentPosition.y - lastPosition.y;
    // 如果正在拖拽则需要判断当前鼠标是否在拖拽容器中
    if (DragContext.isDragging) {
      // 无论是否在拖拽容器中都需要进行预览dom渲染
      previewDom.style.left = `${event.clientX}px`;
      previewDom.style.top = `${event.clientY}px`;

      if (targetContainer) {
        const target = event.target as HTMLElement;
        const targetComp = findCompByDom<Component>(target, acceptType)
        DragContext.targetComp = targetComp;
        // 在容器中且容器可以进行放置，则出发drag
        if (!targetContainer.canDrop || targetContainer.canDrop(targetComp)) {
          const mainDom = targetComp.getMainDom();
          const position = getPositionByEvent(mainDom, event);
          targetContainer.doDrag && targetContainer.doDrag(DragContext, position);
        }
        if (targetContainer !== container) {
          container.doDrag && container.doDrag(DragContext);
        }
      }
    } else {
      // 当用户鼠标按下时
      if (Math.abs(distanceX) > 5 || Math.abs(distanceY) > 5) {
        previewDom.style.left = `${event.clientX}px`;
        previewDom.style.top = `${event.clientY}px`;
        sourceContainer.dragStart && sourceContainer.dragStart(DragContext);
        container.doDrag && container.doDrag(DragContext);
        this.lastPosition = currentPosition;
        DragContext.isDragging = true;
        document.body.appendChild(previewDom);
      }
    }
  }

  /**
   * 鼠标放开时开始触发
   * @param event 
   */
  private mouseUp = (event: MouseEvent) => {
    if (!DragContext.isDragging && !DragContext.isStartDrag) {
      return;
    }
    const { acceptType } = this;
    const target = event.target as HTMLElement;
    const targetTainer = DragContext.targetContainer;
    const comp = findCompByDom<Component>(target, acceptType);
    // 如果有目标拖拽容器就执行目标容器的放置方法
    if (targetTainer && DragContext.isDragging) {
      if (!targetTainer.canDrop || targetTainer.canDrop(comp)) {
        DragContext.event = event;
        DragContext.targetComp = comp;
        const mainDom = comp.getMainDom();
        const position = getPositionByEvent(mainDom, event);
        targetTainer.drop && targetTainer.drop(DragContext, position);
      }
    }
    const sourceContainer = DragContext.sourceContainer;
    // 通知源容器拖拽结束了
    sourceContainer.dragEnd && DragContext.isDragging && sourceContainer.dragEnd(DragContext);
    DragContext.isDragging = false;
    DragContext.isStartDrag = false;
    DragContext.sourceComp = null;
    DragContext.targetComp = null;
    DragContext.targetContainer = null;
    DragContext.sourceContainer = null;
    DragContext.previewDom.remove();
    document.removeEventListener('mousemove', this.throttleMouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * 初始化注册的事件
   */
  private initListenEvent() {
    const { dragDom } = this;
    dragDom.addEventListener('mousedown', this.mouseDown);
    dragDom.addEventListener('mouseenter', this.mouseEnter);
    dragDom.addEventListener('mouseleave', this.mouseLeave);
  }
}