const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");
  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 400,
  });

  const streamWrite = fileHandleWrite.createWriteStream({
    highWaterMark: 500,
  });
  streamRead.on("data", (chunk) => {
    console.log(chunk.length);
    console.log(chunk);
    streamWrite.write(chunk);
  });
})();
