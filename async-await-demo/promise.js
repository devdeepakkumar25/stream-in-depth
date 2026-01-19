const p = new Promise((resolve, reject) => {
  // Kick off some async work
  setTimeout(() => {
    resolve(1); // pending => resolved ,fulfilled
    reject(new Error("message")); //pending => rejected
  }, 2000);
});

p.then((result) => console.log("Result: ", result)).catch((err) =>
  console.log("Error ", err.message)
);


// Promise behaves like a class with two types of methods
// ✔ Constructor method

// Used with new

// new Promise((resolve, reject) => { ... })


// This creates a new promise object.



// ✔ Static methods (NO new)

// These belong to the Promise class itself, NOT to instances.

Promise.resolve()
Promise.reject()
Promise.all()
Promise.race()
Promise.any()
Promise.allSettled()
// Static methods return a promise automatically.
// You do NOT create them with new.

// const p = new Promise((resolve, reject) => {
//   // kick off some async work

//   setTimeout(() => {
//     resolve(1); //=> pending => resolved,fulfilled
//     reject(new Error("message")); //pending => rejected
//   }, 2000);
// });

// p.then((result) => console.log("Result", result)).catch((err) =>
//   console.log("Error", err.message)
// );

