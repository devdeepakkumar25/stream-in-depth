const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const { pipeline } = require("node:stream/promises");

const readWriteStream = async () => {
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("test.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });

  const streamWrite = fileHandleWrite.createWriteStream({
    highWaterMark: 64 * 1024,
  });

  streamRead.on("data", (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
  streamRead.on("end", async () => {
    streamWrite.end();
    await fileHandleRead.close();
    await fileHandleWrite.close();
    console.log("File copied successfully");
  });
  streamRead.on("error", console.error);
  streamWrite.on("error", console.error);
};

// readWriteStream();

const readWritePipeline = async () => {
  await pipeline(
    fsSync.createReadStream("test.txt"),
    fsSync.createWriteStream("dest1.txt")
  );
  console.log("File copied safely");
};

// readWritePipeline();

const run = async () => {
  const fileHanlde = await fs.open("test.txt", "r");
  await pipeline(
    fileHanlde.createReadStream(),
    fsSync.createWriteStream("dest.txt")
  );
  await fileHanlde.close();
  console.log("Handle Sync and promises");
};

run();
