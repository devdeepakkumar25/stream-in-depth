const { Readable } = require("node:stream");
const readline = require("node:readline");

const URL = "https://norvig.com/big.txt";

/**
 * Fetches the document using Fetch API and processes the stream.
 */
async function analyzeDocumentStream(url) {
  console.log(`Starting stream-fetch from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // response.body is a ReadableStream in Node.js 18+
  const reader = readline.createInterface({
    input: Readable.fromWeb(response.body),
    terminal: false,
  });

  const wordCounts = new Map();

  for await (const line of reader) {
    // Regex to extract words: ignores case and handles only letters/apostrophes
    const words = line.toLowerCase().match(/\b[a-z']+\b/g);

    if (words) {
      for (const word of words) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      }
    }
  }

  return wordCounts;
}

/**
 * Sorts and displays the top 10 results.
 */
function displayResults(wordMap) {
  const sorted = [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log("\n--- Analysis Results (Top 10 Words) ---");
  console.table(
    sorted.map(([word, count]) => ({ Word: word, Occurrences: count }))
  );
}

// Main Execution
(async () => {
  try {
    const start = Date.now();

    const counts = await analyzeDocumentStream(URL);
    displayResults(counts);

    const end = (Date.now() - start) / 1000;
    console.log(`\nAnalysis finished in ${end.toFixed(2)} seconds.`);
  } catch (err) {
    console.error("Critical Error:", err.message);
  }
})();
