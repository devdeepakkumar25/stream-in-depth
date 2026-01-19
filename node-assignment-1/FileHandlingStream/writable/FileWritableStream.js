const fs = require("node:fs");
const { Writable } = require("node:stream");

class FileWritableStream extends Writable {
  constructor({ fileName, fileHighWaterMark = 16 * 1024 }) {
    super({ highWaterMark: fileHighWaterMark });

    this.fileName = fileName;
    this.fd = null;

    // Internal buffering
    this.chunks = [];
    this.chunkSize = 0;

    // Debug / stats
    this.writesCount = 0;
  }

  // Runs once before the first write
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  // Called automatically for each .write()
  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;

    // Flush when internal buffer reaches highWaterMark
    if (this.chunkSize >= this.writableHighWaterMark) {
      const buffer = Buffer.concat(this.chunks);

      fs.write(this.fd, buffer, (err) => {
        if (err) return callback(err);

        this.writesCount++;
        this.chunks = [];
        this.chunkSize = 0;
        callback();
      });
    } else {
      callback();
    }
  }

  // Called when .end() is invoked
  _final(callback) {
    // Flush remaining buffered data
    if (this.chunkSize > 0) {
      const buffer = Buffer.concat(this.chunks);

      fs.write(this.fd, buffer, (err) => {
        if (err) return callback(err);
        this.writesCount++;
        fs.close(this.fd, callback);
      });
    } else {
      fs.close(this.fd, callback);
    }
  }

  // Called when stream is destroyed (error or manual destroy)
  _destroy(error, callback) {
    console.log("Stream destroyed");
    console.log("Total disk writes:", this.writesCount);

    if (this.fd) {
      fs.close(this.fd, callback);
    } else {
      callback();
    }
  }
}

// Usage
const writableStream = new FileWritableStream({
  fileName: "output.txt",
});

writableStream.write("Hello ");
writableStream.write("World !");
writableStream.end();
