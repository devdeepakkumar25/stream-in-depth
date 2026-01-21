// const fs = require("fs").promises;
const fs = require("node:fs/promises");

async function writeFileAsyncAwait() {
  try {
    await fs.writeFile("write.txt", "Hello from async/await", "utf8");
    console.log("File written async /await");
  } catch (err) {
    console.error(err.message);
  }
}

// writeFileAsyncAwait();

// fs.writeFile("write.txt", "Hello from as", {
//   encoding: "utf-8",
//   flag: "a",
// }).then(() => console.log("FIle wirtten"));

function writeFileThenCatch() {
  fs.writeFile("write.txt", "Hello from then/catch", "utf8")
    .then(() => console.log("File written (then/catch"))
    .catch((err) => console.error(err.message));
}

// writeFileThenCatch();

async function writefileUsingFdPromise() {
  let fd;
  try {
    fd = await fs.open("write.txt", "w");
    await fd.write("hello from fd promise");
    console.log("File written using fd promise");
  } catch (err) {
    console.error(err.message);
  } finally {
    if (fd) await fd.close();
  }
}

// writefileUsingFdPromise();

function write() {
  let fileHandle;

  fs.open("write.txt", "w")
    .then((fd) => {
      fileHandle = fd;
      return fd.write("hello from promise");
    })
    .then((result) => {
      console.log("Bytes written:", result.bytesWritten);
    })
    .catch((err) => {
      console.error("Error:", err.message);
    })
    .finally(() => {
      if (fileHandle) fileHandle.close();
    });
}

async function appendFileExample() {
  await fs.appendFile("write.txt", "\nAppended.txt");
  console.log("Text appended");
}

appendFileExample();
