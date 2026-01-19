const { Readable } = require("stream");
const readline = require("readline");

const URL = "https://norvig.com/big.txt";

async function analyzeDocument(url) {
  console.log(`Starting stream -featch from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const reader = readline.createInterface({
    input: Readable.fromWeb(response.body),
    terminal: false,
  });

  const wordCounts = new Map();

  for await (const line of reader) {
    const words = line.toLowerCase().match(/\b[a-z']+\b/g);

    if (words) {
      for (const word of words) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    }
  }
  return wordCounts;
}

(async () => {
  try {
    const start = Date.now();
    const counts = await analyzeDocument(URL);
    console.log(counts);
  } catch (error) {
    console.log("Error : ", error);
  }
})();
