import React, { PureComponent } from "react";
import { Worksheet, SpreadSheets, Column } from '@grapecity/spread-sheets-react';

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

  componentDidMount() {
  }

  render() {
    return (<div style={{ width: '100%', height: '100%' }}>
      <SpreadSheets allowUndo>
        <Worksheet>
          <Column dataField='Name' width={300}></Column>
          <Column dataField='Category' width={300}></Column>
          <Column dataField='Price' width={300}
            formatter="$#.00"></Column>
        </Worksheet>
      </SpreadSheets>
    </div>)
  }
}