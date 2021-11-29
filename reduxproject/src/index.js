import React from "react";
import ReactDom from "react-dom";

function FuncComp(props) {
  return <div>撤退</div>;
}

ReactDom.render(React.createElement(FuncComp), document.getElementById("root"));
