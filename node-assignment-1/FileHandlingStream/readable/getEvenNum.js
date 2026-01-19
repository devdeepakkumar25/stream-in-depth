const { error } = require("node:console");
const fs = require("node:fs/promises");

const getEvenNumber = async () => {
  let leftOver = "";
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("even.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream({
    highWaterMark: 64 * 1024,
  });

  streamRead.setEncoding("utf-8");

  streamRead.on("data", (chunk) => {
    chunk = leftOver + chunk;
    const numbers = chunk.split(" ");
    leftOver = numbers.pop();

    for (const num of numbers) {
      const intNum = parseInt(num, 10);

      if (!isNaN(intNum) && intNum % 2 === 0) {
        console.log(intNum);
        if (!streamWrite.write(intNum + " ")) streamRead.pause();
      }
    }
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
  streamRead.on("end", async () => {
    if (leftOver) {
      const intNum = parseInt(leftOver, 10);
      if (!isNaN(intNum) && intNum % 2 === 0) {
        console.log(intNum);
        streamWrite.write(intNum + " ");
      }
    }
    streamWrite.end();
    await fileHandleRead.close();
    await fileHandleWrite.close();
  });
  streamRead.on("error", console.error);
  streamWrite.on("error", console.error);
};

getEvenNumber();
