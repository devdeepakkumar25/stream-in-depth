console.log("Start of script 2");

setTimeout(() => {
  console.log("This is from the Task Queue SetTimeOut");
}, 0);

setTimeout(() => {
  console.log("A");
}, 0);

setTimeout(() => {
  console.log("B");
}, 0);

setTimeout(() => {
  console.log("C");
}, 2 * 1000);

console.log("End of Script");

console.log("BYe BYe");
