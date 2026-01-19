const url = "http://norvig.com/big.txt";

const init = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`${response.status}`);

    const data = await response.text();

    const result = readDoc(data);
    console.table(result);

    // console.log(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

const readDoc = (data) => {
  const words = data.toLowerCase().match(/\b\w+\b/g);

  const wordCount = words.reduce((acc, word) => {
    if (acc[word]) acc[word]++;
    else acc[word] = 1;

    return acc;
  }, {});

  const topWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
  return topWords;
};

init();
