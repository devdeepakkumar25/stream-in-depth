
console.log("Hello Js");
console.log("second");
console.log("Third");
let sum = 0;
// for (let i = 0; i < 3000000000; i++) {
//   sum += i;
// }

// console.log(sum);

setTimeout(() => {
  console.log("Time Out Executed");
}, 5000);

const button1 = document.getElementById("button1");

button1.addEventListener("click", () => {
  console.log("Button 1 is clicked");
});

const button2 = document.getElementById("button2");

button2.addEventListener("click", () => {
  console.log("Button 2 is clicked");
});

const button3 = document.getElementById("button3");

button3.addEventListener("click", () => {
  console.log("Button 3 is clicked");
});

console.log("I am the end");
