/**
 * Exercise Solution
 * Fetch text, analyze word occurrences asynchronously,
 * and print top 10 words in JSON format.
 */

const URL = "http://norvig.com/big.txt";

async function fetchAndAnalyzeDocument() {
  try {
    // 1. Fetch document asynchronously
    const response = await fetch(URL);
    const text = await response.text();

    // 2a. Count word occurrences
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")   // remove punctuation
      .split(/\s+/)              // split by whitespace
      .filter(Boolean);          // remove empty strings

    const wordCount = {};

    for (const word of words) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }

    // 2b. Get top 10 words by occurrence
    const top10 = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count
      }));

    // 3. Show result in JSON format
    console.log(JSON.stringify(top10, null, 2));

  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Execute
fetchAndAnalyzeDocument();
