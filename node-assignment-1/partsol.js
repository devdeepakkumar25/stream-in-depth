const fs = require("fs");

function countWordFrequency(filepath, topN = 20) {
  let text = fs.readFileSync(filepath, "utf8");

  text = text.toLowerCase().match(/\b\w+\b/g);

  // text = text.replace(/[^a-z'\s]/g, " ");

  // text = text.replace(/\s+/g, " ").trim();

  const words = text.split(" ");
  //   console.log(words);
  const map = new Map();
  for (let word of words) {
    if (word.length < 2) continue;
    map.set(word, (map.get(word) ?? 0) + 1);
  }

  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, topN);
}

function getTopWords(wordMap, limit = 10) {
  return [...wordMap.entries()]
    .reduce((top, entry) => {
      top.push(entry);
      top.sort((a, b) => b[1] - a[1]);
      if (top.length > limit) top.pop();
      return top;
    }, [])
    .map(([word, count]) => ({ word, count }));
}

const filePath = "./big.txt";
const result = countWordFrequency(filePath, 10);
console.log(result);
