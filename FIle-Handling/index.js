const fsSync = require("fs");
// const fs = require('fs') // calbacks by default
const fs = require("fs").promises;
// const fs = require("node:fs/promises");

function writeFileSync() {
  const fd = fsSync.openSync("write.txt", "w");
  fsSync.writeSync(fd, "Hello from w mode");
  fsSync.closeSync(fd);
  console.log("File overwritten/written");
}

// writeFileSync();
async function writeFile() {
  try {
    const fd = await fs.open("write.txt", "w");
    await fd.write("Hello from w mode");
    await fd.close();

    console.log("File overwritten/written!");
  } catch (err) {
    console.error(err);
  }
}

// writeFile();

function writeFileUsingPromise() {
  fs.open("write.txt", "w")
    .then((fd) => {
      return fd.write("Hello from w mode").then(() => fd.close());
    })
    .then(() => {
      console.log("File Written");
    })
    .catch((err) => console.error(err.message));
}

// writeFileUsingPromise();

function writeFileUsingPromise2() {
  fs.open("write.txt", "w")
    .then(async (fd) => {
      await fd.write("Hello from w mode");
      return await fd.close();
    })
    .then(() => {
      console.log("File Written");
    })
    .catch((err) => console.error(err.message));
}

function writeFileUsingCallBack() {
  fsSync.open("write.txt", "w", (err, fd) => {
    if (err) throw err;

    fsSync.write(fd, "Hello from w mode", () => {
      console.log("File overwritten/written!");
      fsSync.close(fd, () => {});
    });
  });
}

// writeFileUsingCallBack();

async function writeFileAsyncAwait() {
  try {
    await fs.writeFile("write.txt", "hello from w mode");
    console.log("File written");
  } catch (err) {
    console.error(err.message);
  }
}

// writeFileAsyncAwait();

function writeFileThenCatch() {
  fs.writeFile("write.txt", "hwllo from w mode")
    .then(() => console.log("File written"))
    .catch((err) => console.error(err.message));
}

// writeFileThenCatch();

function writeFileCallback() {
  console.log("Program started");

  fsSync.writeFile("write.txt", "hello from w mode", (err) => {
    if (err) {
      console.error("ERROR:", err);
      return;
    }
    console.log("File written");
  });
}

writeFileCallback();
