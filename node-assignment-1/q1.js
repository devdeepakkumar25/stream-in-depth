const { Readable } = require("stream");
const readline = require("readline");

async function fetchResponseStream(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
  }
  return response.body;
}

function createLineReader(webStream) {
  return readline.createInterface({
    input: Readable.fromWeb(webStream),
    crlfDelay: Infinity,
    terminal: false,
  });
}

async function countWords(reader) {
  const wordMap = new Map();
  try {
    for await (const line of reader) {
      const words = line
        .toLowerCase()
        .replace(/[^a-z'\s]/g, " ")
        .replace(/\s+/g, " ")
        .split(/\s+/)
        .filter(Boolean);
      //   const words = line.toLowerCase().match(/\b\w+\b/g);
      // const words = line.toLowerCase().match(/[a-z']+/g);
      // .replace(/[^a-z'\s]/g, " ")
      // .replace(/\s+/g, " ")
      // .split(/\s+/)
      // .filter(Boolean);
      if (!words) continue;
      for (const word of words) {
        wordMap.set(word, (wordMap.get(word) ?? 0) + 1);
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    reader.close();
  }
  return wordMap;
}

function getTopWords(wordMap, limit = 10) {
  return [...wordMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}

function getJSONString(topWords, space = 2) {
  return JSON.stringify(topWords, null, space);
}
async function analyzeDocument(url, topN = 10) {
  const startTime = Date.now();
  try {
    const responseStream = await fetchResponseStream(url);
    const reader = createLineReader(responseStream);
    const wordMap = await countWords(reader);
    const topWords = getTopWords(wordMap, topN);
    const jsonString = getJSONString(topWords);
    console.log(jsonString);
  } catch (error) {
    console.error("Error: ", error);
  } finally {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\nExecution time: ${duration}s`);
  }
}

const URL = "https://norvig.com/big.txt";
analyzeDocument(URL, 10);
