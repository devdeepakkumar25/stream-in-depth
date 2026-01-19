const fs = require("node:fs/promises");
const fsSync = require("fs");
const { pipeline } = require("node:stream/promises");

const stramCopy = async () => {
  console.time("stream-copy");
  const srcFile = await fs.open("test.txt", "r");
  const destFile = await fs.open("test-copypipe.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();
  console.log(readStream.readableFlowing);
  readStream.pipe(writeStream);
  console.log(readStream.readableFlowing);
  readStream.unpipe(writeStream);
  console.log(readStream.readableFlowing);
  readStream.pipe(writeStream);

  readStream.on("end", () => {
    console.timeEnd("stream-copy");
  });
};

const simplePipeline = async () => {
  try {
    await pipeline(
      fsSync.createReadStream("test.txt"),
      fsSync.createWriteStream("test-pipline-sopy.txt")
    );
    console.log("File copied using pipline");
  } catch (err) {
    console.log(err.message);
  }
};

const copyStreamPipelineq = async () => {
  console.log("stream-copy");
  const srcFile = await fs.open("test.txt", "r");
  const destFile = await fs.open("test-copy2.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  pipeline(readStream, writeStream, (err) => {
    if (err) {
      console.log("Pipeline Failed :", err);
    } else {
      console.log("Pipeline Success");
    }
  });
};

const copyStreamPipeline = async () => {
  console.log("stream-copy");

  const srcFile = await fs.open("test.txt", "r");
  const destFile = await fs.open("test-copy2.txt", "w");

  await pipeline(
    srcFile.createReadStream(),
    fsSync.createWriteStream("test-copy2.txt")
  );

  await srcFile.close();
  await destFile.close();

  console.log("Pipeline Success");
};

copyStreamPipeline().catch(console.error);
