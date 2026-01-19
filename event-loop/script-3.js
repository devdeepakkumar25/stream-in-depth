// console.log("start of script");

// setTimeout(function A() {
//   console.log("This is from the Task Queue (setTimeout)");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("This is from the Microtask Queue (Promise)");

//   Promise.resolve().then(() => {
//     Promise.resolve().then(() => {
//       Promise.resolve().then(() => {
//         Promise.resolve().then(() => {
//           Promise.resolve().then(() => {});
//         });
//       });
//     });
//   });
// });

// console.log("End of Script");

// console.log("start of script");

// setTimeout(() => {
//   console.log("This will NEVER run (Callback Queue starved)");
// }, 0);

// function infiniteMicrotasks() {
//   // Schedule another microtask
//   Promise.resolve().then(() => {
//     // This logs forever (or until the system freezes)
//     console.log("Microtask running… starving callback queue");

//     // Recurse to create infinite microtasks
//     infiniteMicrotasks();
//   });
// }

// // Start the starvation loop
// Promise.resolve().then(() => {
//   console.log("Starting infinite microtask starvation…");
//   infiniteMicrotasks();
// });

// console.log("End of Script");

function logA() {
  console.log("A");
}
function logB() {
  console.log("B");
}
function logC() {
  console.log("C");
}
function logD() {
  console.log("D");
}

// Click the "RUN" button to learn how this works!
logA();

setTimeout(function A() {
  console.log("This is from the Task Queue (setTimeout)");
}, 0);

setTimeout(logB, 0);
Promise.resolve().then(logC);
logD();

// NOTE:
//   This is an interactive vizualization. So try
//   editing this code and see what happens. You
//   can also try playing with some of the examples
//   from the dropdown!
