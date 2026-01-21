function isNumber(str) {
  return /^\d+$/.test(str);
}

console.log(isNumber("123"));
console.log(isNumber("12a"));

console.log(isNumber(""));

function isAlphaNumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

console.log(isAlphaNumeric("abc123"));
console.log(isAlphaNumeric("123#abc"));

function removeSpecialChars(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "");
}

console.log(removeSpecialChars("a@b#1$2cd"));

function countWords(str) {
  return (str.match(/\b\w+\b/g) || []).length;
}

console.log(countWords("Hello world"));

function findDuplicate(str) {
  const words = str.toLowerCase().match(/\b\w+\b/g);
  const map = {};

  const duplicates = [];

  for (let word of words) {
    map[word] = (map[word] || 0) + 1;
  }

  for (let key in map) {
    if (map[key] > 1) duplicates.push(key);
  }
  return duplicates;
}

console.log(
  findDuplicate(
    "hello i am good how are you ? are you okay? yes i am okay thank you",
  ),
);

function validateEmail(email) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-z]{2,}$/.test(email);
}

console.log(validateEmail("deepak@gmail.com"));

function validateDate(date) {
  return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(date);
}

console.log(validateDate("12/12/2023"));

function extractParts(str) {
  return {
    numbers: str.match(/\d+/g).join(""),
    letters: str.match(/[a-zA-Z]+/g).join(""),
    symbols: str.match(/[^a-zA-Z0-9]+/g).join(""),
  };
}

console.log(extractParts("a1@b2#98oj"));

function getTopWords(text, n = 5) {
  const words = text.toLowerCase().match(/\b[a-z0-9]+\b/g);

  const map = new Map();

  for (let word of words) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}
