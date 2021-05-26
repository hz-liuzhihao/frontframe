import React, { PureComponent } from "react";

const config_json = {
  version: "12.0.0",
  tabStripRatio: 0.6,
  sheets: {
    "sheet1": {
      "name": "sheet1",
      "rowCount": 31,
      "columnCount": 30,
      "activeCol": 1,
      "theme": {
        "name": "Office",
        "themeColor": {
          "name": "Office",
          "background1": {
            "a": 255,
            "r": 255,
            "g": 255,
            "b": 255
          },
          "background2": {
            "a": 255,
            "r": 231,
            "g": 230,
            "b": 230
          },
          "text1": {
            "a": 255,
            "r": 0,
            "g": 0,
            "b": 0
          },
          "text2": {
            "a": 255,
            "r": 68,
            "g": 84,
            "b": 106
          },
          "accent1": {
            "a": 255,
            "r": 68,
            "g": 114,
            "b": 196
          },
          "accent2": {
            "a": 255,
            "r": 237,
            "g": 125,
            "b": 49
          },
          "accent3": {
            "a": 255,
            "r": 165,
            "g": 165,
            "b": 165
          },
          "accent4": {
            "a": 255,
            "r": 255,
            "g": 192,
            "b": 0
          },
          "accent5": {
            "a": 255,
            "r": 91,
            "g": 155,
            "b": 213
          },
          "accent6": {
            "a": 255,
            "r": 112,
            "g": 173,
            "b": 71
          },
          "hyperlink": {
            "a": 255,
            "r": 5,
            "g": 99,
            "b": 193
          },
          "followedHyperlink": {
            "a": 255,
            "r": 149,
            "g": 79,
            "b": 114
          }
        },
        "headingFont": "Calibri Light",
        "bodyFont": "Calibri"
      },
      "data": {
        "dataTable": {

        }
      }
    }
  }
};

/**
 * Excel组件
 */
export default class CustomExcel extends PureComponent {

  // 创建excel的指向
  excelRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const config = GC.Spread.Sheets.Designer.DefaultConfig;
    const fontFamilyCmd = GC.Spread.Sheets.Designer.getCommand("fontFamily");
    const customCNFont = [
      { value: "微软雅黑", text: "微软雅黑" },
      { value: "黑体", text: "黑体" },
      { value: "新宋体", text: "新宋体" },
      { value: "仿宋", text: "仿宋" },
      { value: "隶书", text: "隶书" },
      { value: "楷体", text: "楷体" },
    ];
    fontFamilyCmd.dropdownList = customCNFont.concat(fontFamilyCmd.dropdownList);
    config.commandMap = {
      fontFamily: fontFamilyCmd
    }
    const designer = new GC.Spread.Sheets.Designer.Designer(this.excelRef.current);
    designer.setConfig(config);
    const spread = designer.getWorkbook();
    spread.fromJSON(config_json);
    window.spread = spread;
  }

  render() {
    return (<div style={{ width: '100%', height: '100%' }} ref={this.excelRef}>
    </div>);
  }
}