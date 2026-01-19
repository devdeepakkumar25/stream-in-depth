// const { text } = require("./textContent");
// const fs = require("fs");

// // console.log(text);

// let words = text.replace(/\s+/g, " ").trim().split(" ");

// let map = new Map();

// const fd = fs.createWriteStream("words.txt", {
//   flags: "a",
//   encoding: "utf8",
//   autoClose: true,
// });

// for (let word of words) {
//   console.log(word);
//   fd.write(word + "\n");
//   if (word.toLowerCase() === "of") {
//     console.log(word);
//     let count = (map.get(word.toLowerCase()) ?? 0) + 1;

//     map.set(word.toLowerCase(), count);
//   }
// }

// console.log("Word count of the is ", map.get("of"));

const { text } = require("./textContent");
const fs = require("fs");

// console.log(text);

// const texts = text.substring(0, 100);

// let words = texts.match(/\b\w+\b/g);

let words = text.match(/\b[a-zA-Z0-9]+\b/g);

console.log(words);

let map = new Map();

const fd = fs.createWriteStream("words.txt", {
  flags: "a",
  encoding: "utf8",
  autoClose: true,
});

for (let word of words) {
  console.log(word);
  fd.write(word + "\n");
  if (word && word.toLowerCase() === "a") {
    console.log(word);
    let count = (map.get(word.toLowerCase()) ?? 0) + 1;

    map.set(word.toLowerCase(), count);
  }
}

console.log("Word count of the is ", map.get("a"));
