(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.three = void 0;

function three() {
  console.log("three");
}

exports.three = three;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.two = void 0;

function two() {
  console.log("第二个文件");
}

exports.two = two;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = void 0;

var two_1 = require("./two");

var three_1 = require("./three");

function hello() {
  console.log("hello");
  (0, two_1.two)();
  (0, three_1.three)();
}

exports.hello = hello;
hello();

},{"./three":1,"./two":2}]},{},[3])

//# sourceMappingURL=index.js.map
