import React, { PureComponent } from "react";

/**
 * Excel组件
 */
export default class Excel extends PureComponent {

  // 创建excel的指向
  excelRef = React.createRef();

  sheets = null

  constructor(props) {
    super(props);
    this.state = {};
  }

  doCellUpdated = (r, c, oldValue, newValue, isRefresh) => {
    console.log(r, c, oldValue, newValue, isRefresh);
  }

  componentDidMount() {
    const options = {
      container: "excel",
      title: '工作文档',
      lang: 'zh',
      updateUrl: '/update',
      allowUpdate: true,
      myFolderUrl: '',
      cellUpdated: this.doCellUpdated
    };
    luckysheet.create(options);
    this.sheets = luckysheet.getluckysheetfile();
  }

  render() {
    return (<div style={{width: '100%', height: '100%'}} id="excel" ref={this.excelRef}></div>)
  }
}