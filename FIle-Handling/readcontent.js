const fs = require("fs");
const fsp = require("node:fs/promises");

// fs.readFile("write.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data.toString());
// });

function readFile() {
  fs.open("number.txt", "r", (err, fd) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const buffer = Buffer.alloc(100);

    fs.read(fd, buffer, 0, 100, 0, (err, bytesRead) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("Bytes read: ", bytesRead);
      console.log("Data: ", buffer.toString("utf8", 0, bytesRead));

      fs.close(fd, () => {
        console.log("File closed");
      });
    });
  });
}

// readFile();

function readFileSync() {
  const fd = fs.openSync("number.txt", "r");
  const buffer = Buffer.alloc(50);

  const bytesRead = fs.readSync(fd, buffer, 0, 50, 0);
  console.log("Bytes read: ", bytesRead);
  console.log("Data: ", buffer.toString("utf8", 0, bytesRead));
  fs.closeSync(fd);
}

// readFileSync();

async function readUsingPromise() {
  console.log("Read using promises");
  const fd = await fsp.open("number.txt", "r");
  const buffer = Buffer.alloc(50);

  const { bytesRead, buffer: filledBuffer } = await fd.read(buffer, 0, 50, 0);

  console.log("Bytes read: ", bytesRead);
  console.log("Data: ", filledBuffer.toString("utf8", 0, bytesRead));

  await fd.close();
}

// readUsingPromise();

function readingFileChunk() {
  fs.open("number.txt", "r", (err, fd) => {
    const buffer = Buffer.alloc(16);
    let position = 0;

    function readNext() {
      fs.read(fd, buffer, 0, buffer.length, position, (err, bytesRead) => {
        if (bytesRead === 0) {
          fs.close(fd, () => {});
          return;
        }

        console.log(buffer.toString("utf8", 0, bytesRead));
        position += bytesRead;
        readNext();
      });
    }

    readNext();
  });
}

// readingFileChunk();

function readingFileChunkProperly() {
  fs.open("number.txt", "r", (err, fd) => {
    if (err) {
      console.error(err.message);
      return;
    }

    const buffer = Buffer.alloc(16);
    let position = 0;
    let leftover = "";

    function readNext() {
      fs.read(fd, buffer, 0, buffer.length, position, (err, bytesRead) => {
        if (err) {
          console.error(err.message);
          fs.close(fd, () => {});
          return;
        }

        // EOF
        if (bytesRead === 0) {
          if (leftover) {
            console.log(leftover); // last line
          }
          fs.close(fd, () => {
            console.log("File closed ");
          });
          return;
        }

        // Convert only valid bytes
        const chunk = buffer.toString("utf8", 0, bytesRead);
        const data = leftover + chunk;

        const lines = data.split("\n");
        leftover = lines.pop(); // save incomplete line

        for (const line of lines) {
          if (line.trim() !== "") {
            console.log(line);
          }
        }

        position += bytesRead;
        readNext();
      });
    }

    readNext();
  });
}

readingFileChunkProperly();
