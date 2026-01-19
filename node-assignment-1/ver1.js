const { Readable } = require("stream");
const readline = require("readline");

const URL = "https://norvig.com/big.txt";

// Words you want to manually verify
const TARGET_WORDS = [
  "the",
  "of",
  "and",
  "to",
  "in",
  "he",
  "that",
  "was",
  "it",
  "his",
];

/**
 * Manually verify word counts using exact-word matching
 */
async function manualWordVerification(url, targetWords) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const reader = readline.createInterface({
    input: Readable.fromWeb(response.body),
    terminal: false,
    crlfDelay: Infinity,
  });

  // Initialize counts
  const counts = {};
  targetWords.forEach((word) => (counts[word] = 0));

  // Pre-build regex for each word (exact match)
  const regexMap = {};
  targetWords.forEach((word) => {
    regexMap[word] = new RegExp(`\\b${word}\\b`, "gi");
  });

  for await (const line of reader) {
    const lowerLine = line.toLowerCase();

    for (const word of targetWords) {
      const matches = lowerLine.match(regexMap[word]);
      if (matches) {
        counts[word] += matches.length;
      }
    }
  }

  return counts;
}

/**
 * Run verification
 */
(async () => {
  try {
    const verifiedCounts = await manualWordVerification(URL, TARGET_WORDS);

    console.log("\nManual Verification Results:");
    console.table(
      Object.entries(verifiedCounts).map(([word, count]) => ({
        word,
        count,
      }))
    );
  } catch (err) {
    console.error("Verification failed:", err.message);
  }
})();
