const fs = require("fs");
const readline = require("readline");

// Path to downloaded file
const FILE_PATH = "./big.txt";

// Words to verify
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

async function verifyWordCountsFromFile(filePath, words) {
  const fileStream = fs.createReadStream(filePath, "utf-8");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // Initialize counts
  const counts = {};
  words.forEach((word) => (counts[word] = 0));

  // Precompile regex for accuracy
  const regexMap = {};
  words.forEach((word) => {
    regexMap[word] = new RegExp(`\\b${word}\\b`, "gi");
  });

  for await (const line of rl) {
    const lowerLine = line.toLowerCase();

    for (const word of words) {
      const matches = lowerLine.match(regexMap[word]);
      if (matches) {
        counts[word] += matches.length;
      }
    }
  }

  return counts;
}

// Run verification
(async () => {
  try {
    const verifiedCounts = await verifyWordCountsFromFile(
      FILE_PATH,
      TARGET_WORDS
    );

    console.log("\nVerified Word Counts (From File):");
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
