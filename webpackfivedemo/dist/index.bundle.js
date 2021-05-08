(self["webpackChunkwebpackfivedemo"] = self["webpackChunkwebpackfivedemo"] || []).push([[826],{

/***/ 296:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

;// CONCATENATED MODULE: ./src/style.css
// extracted by mini-css-extract-plugin
/* harmony default export */ var style = ({"hello":"_2HAJP4Qe6nvLQQ7IszCZCG"});
;// CONCATENATED MODULE: external "ReactDOM"
var external_ReactDOM_namespaceObject = ReactDOM;
var external_ReactDOM_default = /*#__PURE__*/__webpack_require__.n(external_ReactDOM_namespaceObject);
;// CONCATENATED MODULE: external "React"
var external_React_namespaceObject = React;
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_namespaceObject);
;// CONCATENATED MODULE: ./src/index.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var A = function A() {
  _classCallCheck(this, A);

  this.a = 3;
};

_defineProperty(A, "b", 5);

function getComponent() {
  // const element = document.createElement('div');
  // const btn = document.createElement('button');
  // // lodash 现在通过一个 script 引入
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');
  // const myIcon = new Image();
  // myIcon.src = Icon;
  // element.appendChild(myIcon);
  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;
  // element.appendChild(btn);
  // return element;
  var ni = document.createElement('button');

  ni.onclick = function () {
    __webpack_require__.e(/* import() */ 807).then(__webpack_require__.bind(__webpack_require__, 807)).then(function (_ref) {
      var print = _ref.default;
      return print();
    });
  };

  console.log(style.hello);
  document.body.appendChild(ni);
  return Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 215, 23)).then(function (_ref2) {
    var _ = _ref2.default;
    var element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '');
    console.log('nihao');
    external_ReactDOM_default().render( /*#__PURE__*/external_React_default().createElement('span', {}), element);
    return element;
  }).catch(function (error) {
    return 'An error occurred while loading the component';
  });
}

getComponent().then(function (component) {
  document.body.appendChild(component);
});

/***/ }),

/***/ 215:
/***/ (function(module) {

"use strict";
module.exports = _;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(296));
/******/ }
]);