function greet(name) {
  console.log(`Hello ${name}`);
}

function higherOrderFunction(callback) {
  const name = "Deepak";

  callback(name);
}

higherOrderFunction(greet);

const promise1 = new Promise(() => {});

// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve();
//   }, 5000);
// });

// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject();
//   }, 5000);
// });

// promise.then();
// promise.catch();

async function greet() {
  return Promise.resolve("Hello from async function");
}

// greet().then((value) => console.log(value));

async function greet() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello from async await"), 1000);
  });
  let result = await promise;
  console.log(result);
}

greet();

// sequential Execution

function resolveHello() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("Hello");
    }, 2000);
  });
}

function resolveWorld() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("World");
    }, 1000);
  });
}

async function sequentialStart() {
  const hello = await resolveHello();
  console.log(hello);

  const world = await resolveWorld();
  console.log(world);
}

// sequentialStart();

// Concurrent Execution

async function concurrentStart() {
  const hello = resolveHello();
  const world = resolveWorld();

  console.log(await hello);
  console.log(await world);
}

// concurrentStart();

function parallel() {
  Promise.all([
    (async () => console.log(await resolveHello()))(),
    (async () => console.log(await resolveWorld()))(),
  ]);
  console.log("finally");
}

parallel();
