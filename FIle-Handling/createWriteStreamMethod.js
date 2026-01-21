// const { resolve } = require("dns");
const fs = require("fs");

function writeUsingStream() {
  const stream = fs.createWriteStream("stream.txt");

  stream.write("Chunk 1\n");
  stream.write("chunk 2\n");
  stream.write("chunk 3\n");
  stream.end("Chunk 4\n");

  stream.on("finish", () => {
    console.log("File written using stream");
  });
}

// writeUsingStream();

// function writeNumberUsingStream() {
//   const stream = fs.createWriteStream("number.txt");

//   let num = 10000;
//   while (num > 0) {
//     if (num % 2 === 0) {
//       stream.write(`${num}\n`, "utf8");
//     }
//     num--;
//     if (num === 1) {
//       stream.end("0\n", "utf8");
//     }
//   }
//   stream.on("finish", () => {
//     console.log("All even number written using stream");
//   });
// }

// writeNumberUsingStream();

function writeNumberUsingStream() {
  const stream = fs.createWriteStream("number.txt");

  let num = 10000;
  while (num > 0) {
    if (num % 2 === 0) {
      stream.write(num.toString() + "\n", "utf8");
    }
    num--;
    if (num === 1) {
      stream.end("0\n", "utf8");
    }
  }
  stream.on("finish", () => {
    console.log("All even number written using stream");
  });
}

// writeNumberUsingStream();

function writeFileUsingStreamProperly() {
  const stream = fs.createWriteStream("stream.txt", {
    flags: "w",
    encoding: "utf-8",
    highWaterMark: 16,
    autoClose: true,
  });

  let i = 0;
  function writeData() {
    while (i < 100) {
      const canWrite = stream.write(`Chunk ${i}\n`);
      i++;

      if (!canWrite) {
        console.log("Backpressuse detected " + i);
        return;
      }
    }
    stream.end("Last Chunk \n");
  }

  stream.on("drain", () => {
    console.log("Drain event fired");
    writeData();
  });

  stream.on("error", (err) => {
    console.error(err.message);
  });

  stream.on("error", (err) => {
    console.error(err.message);
  });
  writeData();
}

// writeFileUsingStreamProperly();

function writeFileUsingStreamWIthThrottlewrong() {
  const stream = fs.createWriteStream("stream.txt", {
    flags: "w",
    encoding: "utf8",
    highWaterMark: 64,
    autoClose: true,
  });

  let i = 0;
  let MAX = 100;

  function writeChunk() {
    let canwrite = true;

    while (i < MAX && canwrite) {
      canwrite = stream.write(`Chunk ${i}\n`);
      console.log(`Writing chunk ${i}`);
      i++;
    }
    if (i >= MAX) {
      stream.end("Last Chunk\n");
      return;
    }
    stream.once("drain", () => {
      console.log("Drain event fired -> resuming after delay");
      setTimeout(writeChunk, 5000);
    });

    stream.on("open", (fd) => {
      console.log("File opened, fd: ", fd);
    });

    stream.on("finish", () => {
      console.log("All chunks written , stream finished");
    });
    stream.on("close", () => {
      console.log("File descriptor closed");
    });

    stream.on("error", () => {
      console.log("Stream Error: ", err.message);
    });
  }
  writeChunk();
}
// writeFileUsingStreamWIthThrottlewrong();

function writeFileUsingStreamWithThrottle() {
  const stream = fs.createWriteStream("stream.txt", {
    flags: "w",
    encoding: "utf8",
    highWaterMark: 64,
    autoClose: true,
  });

  let i = 0;
  const MAX = 100;

  stream.on("open", (fd) => {
    console.log("File opened , fd: ", fd);
  });

  stream.on("finish", () => {
    console.log("All chunks writtend ,stream finished");
  });

  stream.on("close", (fd) => {
    console.log("file desciptor closed: ", fd);
  });

  stream.on("error", (err) => {
    console.error("Stream Error: ", err.message);
  });

  function writeChunk() {
    let canWrite = true;

    while (i < MAX && canWrite) {
      canWrite = stream.write(`Chunk ${i}\n`);
      console.log(`Writing chunk ${i}`);
      i++;
    }

    if (i > MAX) {
      stream.end("Last Chunk\n");
      return;
    }
    stream.once("drain", () => {
      console.log("Drain event fired -> resuming after delay");
      setTimeout(writeChunk, 5000);
    });
  }

  writeChunk();
}

// writeFileUsingStreamWithThrottle();

function writeUsingStreamCallback(callback) {
  const stream = fs.createWriteStream("stream.txt", {
    flags: "w",
    encoding: "utf8",
    highWaterMark: 1,
    autoClose: true,
  });

  stream.write("Chunk 1\n");
  stream.write("Chunk 2\n");
  stream.write("Chunk 3\n");
  stream.write("Chunk 4\n");
  stream.write("Chunk 5\n");
  stream.write("Chunk 6\n");
  stream.end("Chunk 7\n");

  stream.on("finish", () => {
    callback(null, "File written using stream callback");
  });

  stream.on("drain", () => {
    callback(null, "Drain called");
  });

  stream.on("error", (err) => {
    callback(err);
  });
}

// writeUsingStreamCallback((err, message) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log(message);
// });

function writeUsingStreamPromise() {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream("stream.txt", {
      flags: "w",
      encoding: "utf-8",
      highWaterMark: 16 * 1024,
      autoClose: true,
    });

    stream.write("Chunk 1\n");
    stream.write("Chunk 2\n");
    stream.write("Chunk 3\n");
    stream.end("Chunk 4\n");

    stream.on("finish", () => {
      resolve("File written using stream promises");
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}

// writeUsingStreamPromise()
//   .then((msg) => console.log(msg))
//   .catch((err) => console.error(err.message));

async function writeUsingStreamAsyncAwait() {
  const streamPromise = new Promise((resolve, reject) => {
    const stream = fs.createWriteStream("stream.txt", {
      encoding: "utf8",
    });

    stream.write("Chunk 1\n");
    stream.write("Chunk 2\n");
    stream.write("Chunk 3\n");
    stream.end("Chunk 4\n");

    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  await streamPromise;
  console.log("File written using stream async await ");
}

// writeUsingStreamAsyncAwait();

async function writeLargeDataUsingStream() {
  const stream = fs.createWriteStream("stream.txt", {
    encoding: "utf8",
    highWaterMark: 64,
  });

  let i = 0;

  const finished = new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  function write() {
    while (i < 10000) {
      const ok = stream.write(`Line ${i}\n`);
      i++;

      if (!ok) {
        console.log("Buffer fill waiting for drain...");
        // stream.once("drain", write);
        stream.once("drain", () => {
          console.log("Drain event fired resuming write ", i);
          write();
        });
        return;
      }
    }
    stream.end();
  }

  write();
  await finished;

  console.log("Large data written safely using stream");
}

writeLargeDataUsingStream();
