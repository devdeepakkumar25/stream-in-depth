(function (exports, require, module, __filename, __dirname) {});
console.log(__filename);
console.log(__dirname);

var x;
var url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

module.exports.log = log;

module.exports.endPoint = url;

module.exports = log;
exports.log = log;

(function (exports, require, module) {
  console.log(__filename);
  console.log(__dirname);
  function log(msg) {
    console.log(msg);
  }
  module.exports = log;
})(exports, require, module);

// console.log();
// setTimeout();
// clearTimeout();

// setInterval();

// clearInterval();

// globalThis.console.log("Hwllo");

// var sayHello = function(){

// }

// const logger = require("./logger");
// logger("Deepak");

// console.log(module);

// logger.log("Deepak");

// console.log(logger.endPoint);

// console.log(logger);

// const { log: logFun, endPoint: endpoint } = require("./logger");
// logFun("hello");
// console.log(endpoint);

// // (function (exports, require, module, __filename, __dirname) {})();
// // (function (exports, require, module, __filename, __dirname) {
// //   console.log(__filename);
// //   console.log(__dirname);
// // })();
