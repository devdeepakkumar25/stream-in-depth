// console.log(arguments);

// console.log(require("module").wrapper);

const C = require("./test-mdoule1");

const calc = new C();

console.log(calc.add(2, 3));

// const calc2 = require("./test-module2");

// console.log(calc2.add(4, 5));

const { add, multiply, divide } = require("./test-module2");
console.log(add(4, 6));

require("./test-module3")();
require("./test-module3")();
require("./test-module3")();
