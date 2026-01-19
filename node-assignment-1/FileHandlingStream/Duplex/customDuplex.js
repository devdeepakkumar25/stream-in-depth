const fs = require("node:fs");
const { Duplex } = require("node:stream");

class FileDuplexStream extends Duplex {
  constructor({
    readFileName,
    writeFileName,
    readableHighWaterMark = 16 * 1024,
    writableHighWaterMark = 16 * 1024,
  }) {
    super({
      readableHighWaterMark,
      writableHighWaterMark,
    });

    this.readFileName = readFileName;
    this.writeFileName = writeFileName;

    this.readFd = null;
    this.writeFd = null;

    this.readOffset = 0;
    this.writeBuffer = [];
    this.writeSize = 0;
  }

  // 1️⃣ Called once before any read/write
  _construct(callback) {
    fs.open(this.readFileName, "r", (err, rfd) => {
      if (err) return callback(err);

      fs.open(this.writeFileName, "w", (err, wfd) => {
        if (err) return callback(err);

        this.readFd = rfd;
        this.writeFd = wfd;
        callback();
      });
    });
  }

  // 2️⃣ READ side (Readable part)
  _read(size) {
    const buffer = Buffer.alloc(size);

    fs.read(this.readFd, buffer, 0, size, this.readOffset, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
        return;
      }

      if (bytesRead === 0) {
        this.push(null); // EOF
        return;
      }

      this.readOffset += bytesRead;
      this.push(buffer.slice(0, bytesRead));
    });
  }

  // 3️⃣ WRITE side (Writable part)
  _write(chunk, encoding, callback) {
    this.writeBuffer.push(chunk);
    this.writeSize += chunk.length;

    if (this.writeSize >= this.writableHighWaterMark) {
      const buffer = Buffer.concat(this.writeBuffer);

      fs.write(this.writeFd, buffer, (err) => {
        if (err) return callback(err);

        this.writeBuffer = [];
        this.writeSize = 0;
        callback();
      });
    } else {
      callback();
    }
  }

  // 4️⃣ Called when writable side ends
  _final(callback) {
    if (this.writeSize > 0) {
      const buffer = Buffer.concat(this.writeBuffer);

      fs.write(this.writeFd, buffer, (err) => {
        if (err) return callback(err);
        fs.close(this.writeFd, callback);
      });
    } else {
      fs.close(this.writeFd, callback);
    }
  }

  // 5️⃣ Cleanup (error or destroy)
  _destroy(error, callback) {
    const tasks = [];

    if (this.readFd) {
      tasks.push((cb) => fs.close(this.readFd, cb));
    }

    if (this.writeFd) {
      tasks.push((cb) => fs.close(this.writeFd, cb));
    }

    let pending = tasks.length;
    if (pending === 0) return callback(error);

    tasks.forEach((task) =>
      task(() => {
        if (--pending === 0) callback(error);
      })
    );
  }
}

// module.exports = FileDuplexStream;
// const FileDuplexStream = require("./FileDuplexStream");

const duplex = new FileDuplexStream({
  readFileName: "test.txt",
  writeFileName: "copy.txt",
  readableHighWaterMark: 8,
  writableHighWaterMark: 16,
});

duplex.on("data", (chunk) => {
  console.log("READ:", chunk.toString());
});

// duplex.write(Buffer.from("New Text String"));
// duplex.write(Buffer.from("New Text String"));

// duplex.write(Buffer.from("New Text String"));

// duplex.write(Buffer.from("New Text String"));
// duplex.end(Buffer.from("New Text String"));

duplex.on("end", () => {
  console.log("READ END");
});

// Pipe readable side into writable side
duplex.pipe(duplex);
