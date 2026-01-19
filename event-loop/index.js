// console.log("Hello From Node js");
// const crypto = require("crypto");

// const fs = require("fs");

// const start = Date.now();

// process.env.UV_THREADPOOL_SIZE = 1;

// setTimeout(() => console.log("Hello from Timer !"), 0);

// setImmediate(() => console.log("Hello from Immediate Fn 1"));

// console.log("Hello from top level code");

// fs.readFile("sample.txt", "utf-8", () => {
//   console.log("IO Polling Finish");

//   setTimeout(() => console.log("Hello from timer 2"), 0);
//   setTimeout(() => console.log("Hello from Timer 3"), 5 * 1000);
//   setImmediate(() => console.log("hello from Immediate Fn 2"));

//   crypto.pbkdf2("password1", "salt1", 10000, 1024, "sha512", () => {
//     console.log(`Password 1 Done time:  ${Date.now() - start}ms`);
//   });
//   crypto.pbkdf2("password2", "salt1", 10000, 1024, "sha512", () => {
//     console.log(`Password 2 Done time:  ${Date.now() - start}ms`);
//   });
//   crypto.pbkdf2("password3", "salt1", 10000, 1024, "sha512", () => {
//     console.log(`Password 3 Done time:  ${Date.now() - start}ms`);
//   });
//   crypto.pbkdf2("password4", "salt1", 10000, 1024, "sha512", () => {
//     console.log(`Password 4 Done time:  ${Date.now() - start}ms`);
//   });

//   crypto.pbkdf2("password4", "salt1", 10000, 1024, "sha512", () => {
//     console.log(`Password 4 Done time:  ${Date.now() - start}ms`);
//   });
// });

// console.log("Hello from Top level Code.");

const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);

console.log("1");

// Blocking
const result = fs.readFileSync("contacts.txt", "utf-8");
// Non Blocking"utf-8

fs.readFile("contacts.txt", (err, result) => {
  if (err) throw err;
  console.log(result.toString());
});

console.log(result);

console.log("2");
