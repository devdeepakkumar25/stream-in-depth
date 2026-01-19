const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 6;
setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);

setImmediate(() => console.log("Immediate 1 finished"));

console.time("Time");

fs.readFile("guid.js", () => {
  console.log("I/o finished");
  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);

  setImmediate(() => console.log("Immediate 2 finished"));

  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 0);

  setImmediate(() => console.log("Immediate 3 finished"));

  process.nextTick(() => {
    console.log("Process.nextTick() called inside file");
  });

  console.timeEnd("Time");

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.log("Sync veriosn passrod 1 enrypted ");
  console.timeEnd("Time");

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.timeEnd("Time");

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.timeEnd("Time");

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512");
  console.timeEnd("Time");

  crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 1");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 2");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 3");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 4");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 5");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 6");
  });
  console.timeEnd("Time");

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log("Password encrypted 7");
  });
  console.timeEnd("Time");
});

process.nextTick(() => {
  console.log("Process.nextTick() called");
});
Promise.resolve("hello from promise").then((data) => console.log(data));

console.log("Helo from the top -level code");
