// const URL = "http://norvig.com/big.txt";

async function fetchFile() {
  try {
    const response = await fetch(URL);
    const text = await response.text();
    console.log(text);
    console.log(text.length);
  } catch (err) {
    console.log(err);
  }
}

// fetchFile();
const https = require('https');
const readline = require('readline');

const URL = 'https://norvig.com/big.txt';

/**
 * Fetches the document and processes it line by line to count word frequencies.
 */
async function analyzeDocument(url) {
    console.log(`Fetching and analyzing: ${url}...`);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch: ${res.statusCode}`));
                return;
            }

            const wordCounts = new Map();
            
            // Create a readline interface to process the stream line-by-line
            const rl = readline.createInterface({
                input: res,
                terminal: false
            });

            rl.on('line', (line) => {
                // Regex to extract words: ignores case, punctuation, and numbers
                const words = line.toLowerCase().match(/\b[a-z']+\b/g);
                
                if (words) {
                    for (const word of words) {
                        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
                    }
                }
            });

            rl.on('close', () => {
                resolve(wordCounts);
            });

            rl.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
}

/**
 * Sorts and displays the top N words.
 */
function displayTopWords(wordMap, limit = 10) {
    const sortedWords = [...wordMap.entries()]
        .sort((a, b) => b[1] - a[1]) // Sort by count descending
        .slice(0, limit);

    console.log(`\nTop ${limit} Word Occurrences:`);
    console.table(sortedWords.map(([word, count]) => ({ Word: word, Count: count })));
}

// Execution block
(async () => {
    try {
        const startTime = Date.now();
        const wordMap = await analyzeDocument(URL);
        displayTopWords(wordMap, 10);
        
        const duration = (Date.now() - startTime) / 1000;
        console.log(`\nAnalysis completed in ${duration}s`);
    } catch (error) {
        console.error('Error during analysis:', error.message);
    }
})();