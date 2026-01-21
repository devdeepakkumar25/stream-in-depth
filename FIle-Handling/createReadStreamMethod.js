const fs = require("fs");
const { Transform } = require("stream");
const readline = require("readline");

function readingUsingStream() {
  const readStream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 5,
  });
  let leftover = "";

  readStream.on("data", (chunk) => {
    let chunks = chunk.toString("utf8");
    let data = leftover + chunks;
    const lines = data.split("\n");
    leftover = lines.pop();

    for (const line of lines) {
      if (line.trim() !== "") {
        console.log(line);
      }
    }
    // console.log("Chunk received: \n", chunk);
  });

  readStream.on("end", () => {
    if (leftover.trim() !== "") {
      console.log(leftover);
    }
    console.log("File read completely");
  });

  readStream.on("error", console.error);
}

// readingUsingStream();

function readingUsingStream() {
  const readStream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 5,
  });
  let leftover = 0;

  readStream.on("data", (chunk) => {
    let chunks = chunk.toString("utf8");
    let data = leftover + chunks;
    const lines = data.split("/n");
    leftover = lines.pop();

    for (const line of lines) {
      if (line.trim() !== "") {
        console.log(line);
      }
    }
    // console.log("Chunk received: \n", chunk);
  });

  readStream.on("end", () => {
    console.log("File read completely");
  });

  readStream.on("error", console.error);
}

// readingUsingStream();

function readUsingStreamCallback(callback) {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 32,
  });

  let data = "";

  stream.on("data", (chunk) => {
    data += chunk;
  });
  stream.on("end", () => {
    callback(null, data);
  });
  stream.on("error", (err) => {
    callback(err);
  });
}

// readUsingStreamCallback((err, content) => {
//   if (err) return console.error(err.message);
//   console.log("Cllback read:\n", content);
// });

function readUsingStreamCallbackPerChunk(onChunk, onEnd, onError) {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 32,
  });

  stream.on("data", (chunk) => {
    onChunk(chunk);
  });

  stream.on("end", () => {
    if (onEnd) onEnd();
  });

  stream.on("error", (err) => {
    if (onError) onError(err);
  });
}

// readUsingStreamCallbackPerChunk(
//   (chunk) => {
//     console.log("chunk recevied:\n", chunk);
//   },
//   () => {
//     console.log("File read complete");
//   },
//   (err) => {
//     console.error(err.message);
//   }
// );

function readUsingStreamCallbackPerLine(onLine, onEnd, onError) {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 32,
  });

  let leftover = "";

  stream.on("data", (chunk) => {
    const data = leftover + chunk;
    const lines = data.split("\n");
    leftover = lines.pop();
    for (const line of lines) {
      onLine(line);
    }
  });

  stream.on("end", () => {
    if (leftover) onLine(leftover);
    if (onEnd) onEnd();
  });

  stream.on("error", (err) => {
    if (onError) onError(err);
  });
}

// readUsingStreamCallbackPerLine(
//   (line) => {
//     console.log("Line: ", line);
//   },
//   () => {
//     console.log("Done");
//   },
//   (err) => {
//     console.error(err.message);
//   }
// );
function readUsingStreamPromise() {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream("stream.txt", {
      encoding: "utf8",
      highWaterMark: 64,
    });

    let data = "";

    stream.on("data", (chunk) => {
      data += chunk;
    });

    stream.on("end", () => {
      resolve(data);
    });

    stream.on("error", reject);
  });
}

// readUsingStreamPromise()
//   .then((data) => console.log("Promise read:\n", data))
//   .catch((err) => console.error(err.message));

async function readUsingStreamAsyncAwait() {
  const data = await readUsingStreamPromise();
  console.log("Async/Await read:\n", data);
}

// readUsingStreamAsyncAwait();

function readUsingStreamWithThrottle() {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 16,
  });

  stream.on("data", (chunk) => {
    console.log("Chunk received:\n", chunk.trim());

    stream.pause();

    setTimeout(() => {
      console.log("Resuming read...");
      stream.resume(); // ▶ resume after delay
    }, 1000);
  });

  stream.on("end", () => {
    console.log("Finished reading with throttle");
  });

  stream.on("error", console.error);
}

// readUsingStreamWithThrottle();
async function readLargeDataUsingStream() {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 64,
  });

  let lineCount = 0;

  const finished = new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });

  stream.on("data", (chunk) => {
    lineCount += chunk.split("\n").length - 1;
  });

  await finished;
  console.log("Large file read completed, lines:", lineCount);
}

// readLargeDataUsingStream();

function createLineReader(filePath, onLine, onEnd, onError) {
  const stream = fs.createReadStream(filePath, {
    encoding: "utf8",
    highWaterMark: 32,
  });

  let leftover = "";
  let paused = false;

  stream.on("data", (chunk) => {
    const data = leftover + chunk;
    const lines = data.split("\n");
    leftover = lines.pop();

    for (const line of lines) {
      onLine(line);

      if (paused) {
        stream.pause();
        return;
      }
    }
  });

  stream.on("end", () => {
    if (leftover) onLine(leftover);
    onEnd && onEnd();
  });

  stream.on("error", (err) => {
    onError && onError(err);
  });

  return {
    pause() {
      paused = true;
      stream.pause();
    },
    resume() {
      if (paused) {
        paused = false;
        stream.resume();
      }
    },
    destroy() {
      stream.destroy();
    },
  };
}

// const reader = createLineReader(
//   "stream.txt",
//   (line) => {
//     console.log("Line:", line);

//     if (line.includes("Line")) {
//       console.log("⏸ Pausing...");
//       reader.pause();

//       setTimeout(() => {
//         console.log("▶️ Resuming...");
//         reader.resume();
//       }, 2000);
//     }
//   },
//   () => {
//     console.log("Done");
//   },
//   (err) => {
//     console.error(err.message);
//   }
// );

function readlinebyLineMethod() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const rl = readline.createInterface({
    input: fs.createReadStream("stream.txt"),
    output: process.stdin,
  });
  let closed = false;
  rl.on("line", async (line) => {
    console.log(line);
    rl.pause();

    await delay(5000);
    if (!closed) rl.resume();
  });

  rl.on("close", () => {
    closed = true;
    console.log("readline closed");
  });
}

// readlinebyLineMethod();

function readLineByLine() {
  const rl = readline.createInterface({
    input: fs.createReadStream("stream.txt"),
    output: process.stdout,
  });

  let closed = false;

  rl.on("line", async (line) => {
    console.log(line);
    rl.pause();

    await new Promise((r) => {
      setTimeout(() => {
        if (!closed) {
          rl.resume();
        }
        r();
      }, 5000);
    });

    // setTimeout(() => {
    //   if (!closed) {
    //     rl.resume();
    //   }
    // }, 5000);
  });
  rl.on("close", () => {
    closed = true;
    console.log("Readline closed");
  });
}

// readLineByLine();

function copyFileUsingPipe() {
  const readStream = fs.createReadStream("stream.txt");
  const writeStream = fs.createWriteStream("copy.txt");

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File copied using pipe");
  });
}

// copyFileUsingPipe();

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    callback(null, upper); // push transformed data
  },
});

fs.createReadStream("stream.txt")
  .pipe(upperCaseTransform)
  .pipe(
    fs.createWriteStream("output.txt", {
      flags: "a",
    }),
  );

function run() {
  const stream = fs.createReadStream("stream.txt", {
    encoding: "utf-8",
    highWaterMark: 16 * 1024,
  });

  const rl = readline.createInterface({
    input: stream,
  });

  rl.on("line", (line) => {
    rl.pause(); // pause reading

    console.log("Line:", line);

    setTimeout(() => {
      rl.resume(); // resume after async work
    }, 5000);
  });

  rl.on("close", () => {
    console.log("Reading finished");
  });

  rl.on("error", (err) => {
    console.error("Readline error:", err.message);
  });
}

function run2() {
  const upperCase = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    },
  });

  const stream = fs.createReadStream("write.txt");

  const rl = readline.createInterface({
    input: stream.pipe(upperCase),
  });

  rl.on("line", (line) => {
    process.stdout.write(line + "\n");
  });

  rl.on("close", () => {
    console.log("Readline closed");
  });
}

function run3() {
  const upperCase = new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString().toUpperCase();
      callback(null, text);
    },
  });

  const stream = fs.createReadStream("write.txt", {
    highWaterMark: 16 * 1024,
  });

  const rl = readline.createInterface({
    input: stream.pipe(upperCase),
    output: process.stdout,
  });

  rl.on("line", (line) => {
    console.log("line", line);
  });

  rl.on("close", () => {
    console.log("Read line clsoe");
  });
}
