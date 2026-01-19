function A() {
  console.log("A");
}

function B() {
  console.log("B");
}

A();

B();

function greet() {
  console.log("Hello");
}

// setTimeout(greet, 2000);

function greet(name) {
  console.log(`Hello ${name}`);
}

setTimeout(greet, 2000, "Deepak");

const timeoutId = setTimeout(greet, 2000, "John");

// clearTimeout(timeoutId);

const timeoutIr = setInterval(greet, 2000, "Deepak");

clearInterval(timeoutIr);

setTimeout(function run() {
  console.time("runExecution");
  console.log("Hello fraom Recursive Funtion: ");
  console.timeEnd("runExecution");
  setTimeout(run, 1000);
}, 1000);



