const https = require("node:https");
const { Readable } = require("node:stream");
const readline = require("node:readline");

const URL = "https://norvig.com/big.txt";

/**
 * Fetches and analyzes the document using https streams
 */
function analyzeDocumentStream(url) {
  return new Promise((resolve, reject) => {
    console.log(`Starting stream-fetch from: ${url}`);

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP error! status: ${res.statusCode}`));
          res.resume(); // consume stream to free memory
          return;
        }

        const reader = readline.createInterface({
          input: res, // res is already a Node Readable stream
          terminal: false,
          crlfDelay: Infinity,
        });

        const wordCounts = new Map();

        (async () => {
          try {
            for await (const line of reader) {
              const words = line.toLowerCase().match(/\b[a-z']+\b/g);

              if (words) {
                for (const word of words) {
                  wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
                }
              }
            }

            resolve(wordCounts);
          } catch (err) {
            reject(err);
          }
        })();
      })
      .on("error", reject);
  });
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
