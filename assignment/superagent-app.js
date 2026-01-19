const superagent = require("superagent");
const readline = require("node:readline");

const URL = "https://norvig.com/big.txt";

/**
 * Fetches the document using superagent (STREAMING MODE)
 */
async function analyzeDocumentStream(url) {
  console.log(`Starting stream-fetch from: ${url}`);

  const req = superagent.get(url).buffer(false); // ⭐ VERY IMPORTANT

  const reader = readline.createInterface({
    input: req, // now this is a real flowing stream
    terminal: false,
    crlfDelay: Infinity,
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

/**
 * Sorts and displays the top 10 results.
 */
function displayResults(wordMap) {
  const sorted = [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log("\n--- Analysis Results (Top 10 Words) ---");
  console.table(
    sorted.map(([word, count]) => ({
      Word: word,
      Occurrences: count,
    }))
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
