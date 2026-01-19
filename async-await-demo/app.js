// const p = Promise.resolve({ id: 1 });

// p.then((result) => console.log(result));

// const e = Promise.reject(new Error("reason for rejection...."));

// e.catch((err) => console.log("err: ", err.message));

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 3...");
    resolve(3);
  }, 2000);
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 4...");
    // reject(new Error("because something failed..."));
  }, 2000);
});

// Promise.all([(p1, p2)]).then((result) => console.log(result)); //=> [1]

// Promise.all([p1, p2]).then((result) => console.log(result)); //=.[1,2]
// Promise.all([p1, p2, p3]).then((result) => console.log(result)); //=.[1,2,3]

// Promise.all([p1, p2, p3, p4])
//   .then((result) => console.log(result))
//   .catch((err) => console.log("err : ", err.message));

Promise.race([p1, p2]).then((res) => console.log(res));

// console.log([(1, 2)]);
