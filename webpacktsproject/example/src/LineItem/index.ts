import { Component, ComponentArgs } from '../../../lib';
import './index.css';
import styles from './index.less';
import { createElement, setDomAttr } from '../../../lib';

export interface LineItemData {
  id: string | number;

  imgSrc: string;
  
  title: string;

  describe: string;

  btnText: string;
}

export interface LineItemArgs extends ComponentArgs {
  data: LineItemData;

  onClick: (data: LineItemData, event: MouseEvent) => void;
}

export class LineItem extends Component {

  private data: LineItemData;

  private avatorDom: HTMLImageElement;

  private titleDom: HTMLSpanElement;

  private describeDom: HTMLSpanElement;

  private rightBtnDom: HTMLButtonElement;


  public constructor(args: LineItemArgs) {
    super(args);
    this.data = args.data;
  }

  public setData(data: LineItemData) {
    this.data = data;
    this.requestRender();
  }

  public getData() {
    return this.data;
  }

  protected initData() {
    // TODO
  }

  protected initEvent() {
    // TODO
  }

  /** @override */
  protected initDom(args: LineItemArgs) {
    const { mainDom } = this;
    const { onClick, data } = args;
    const avator = this.avatorDom = createElement('img');
    avator.classList.add(styles.Avator);
    const title = this.titleDom = createElement('span');
    title.classList.add(styles.Name);
    const describe = this.describeDom = createElement('span');
    describe.classList.add(styles.Describe);
    const rightBtn = this.rightBtnDom = createElement('button');
    rightBtn.classList.add(styles.RightBtn);
    rightBtn.addEventListener('click', (e) => onClick(this.data, e));
    const container = createElement<HTMLDivElement>('div');
    container.classList.add(styles.Container);
    container.appendChild(title);
    container.appendChild(describe);
    mainDom.appendChild(avator);
    mainDom.appendChild(container);
    mainDom.appendChild(rightBtn);
  }

  /** @implements */
  protected render() {
    const { data, avatorDom, titleDom, describeDom, rightBtnDom } = this;
    const { imgSrc, title, describe, btnText } = data;
    setDomAttr<HTMLImageElement>(avatorDom, 'src', imgSrc);
    setDomAttr<HTMLSpanElement>(titleDom, 'textContent', title);
    setDomAttr<HTMLSpanElement>(describeDom, 'textContent', describe);
    setDomAttr<HTMLSpanElement>(rightBtnDom, 'textContent', btnText);
  }
}