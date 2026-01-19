const { Readable } = require("node:stream");
const fs = require("node:fs");

class FileCustomReadable extends Readable {
  constructor({ fileName, highWaterMark = 16 * 1024 }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.offset = 0;
  }

  // Called once before first read
  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  // Called by Node when it wants more data
  _read(size) {
    const buffer = Buffer.alloc(size);

    fs.read(this.fd, buffer, 0, size, this.offset, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
        return;
      }

      if (bytesRead === 0) {
        // EOF → tell stream no more data
        this.push(null);
        return;
      }

      this.offset += bytesRead;

      // Push only valid bytes
      this.push(buffer.slice(0, bytesRead));
    });
  }

  // Cleanup
  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, callback);
    } else {
      callback();
    }
  }
}

const readableStream = new FileCustomReadable({
  fileName: "test.txt",
  highWaterMark: 5,
});

// readableStream.on("data", (chunk) => {
//   console.log("Chunk: ", chunk.toString());
// });

// readableStream.on("end", () => {
//   console.log("End of FIle");
// });

let leftover = "";

readableStream.on("data", (chunk) => {
  chunk = leftover + chunk.toString();

  const parts = chunk.split(/\s+/); // split on spaces/newlines
  leftover = parts.pop(); // last may be incomplete

  for (const num of parts) {
    if (num !== "") {
      console.log("Number:", num);
    }
  }
});

readableStream.on("end", () => {
  if (leftover) {
    console.log("Number:", leftover);
  }
  console.log("END");
});
