const { Readable, Writable, Transform, Duplex, pipeline } = require("stream");

function FileDuplex(filePath) {
  Duplex.call(this);

  this.writeStream = fs.createWriteStream(filePath, { flags: "a" });
  this.readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

  const self = this;

  // Forward read stream data to duplex readable side
  this.readStream.on("data", (chunk) => {
    if (!self.push(chunk)) {
      self.readStream.pause();
    }
  });

  this.readStream.on("end", () => {
    self.push(null);
  });
}

require("util").inherits(FileDuplex, Duplex);

/* Writable side */
FileDuplex.prototype._write = function (chunk, encoding, callback) {
  this.writeStream.write(chunk, encoding, callback);
};

/* Readable side */
FileDuplex.prototype._read = function () {
  this.readStream.resume();
};

/* Cleanup */
FileDuplex.prototype._final = function (callback) {
  this.writeStream.end();
  callback();
};

// module.exports = FileDuplex;

class FileDuplex extends Duplex {
  constructor(inputFile, outputFile) {
    super({ encoding: "utf-8" });
    this.filePath;
    this.writeStream = fs.createWriteStream(outputFile, { flags: "a" });
    this.readStream = fs.createReadStream(inputFile, { encoding: "utf-8" });
    this.readStream.on("data", (chunk) => {
      if (!this.push(chunk)) {
        this.readStream.pause();
      }
    });
    this.readStream.on("end", () => this.push(null));

    this.readStream.on("error", (err) => {
      this.destroy(err);
    });
  }

  _read() {
    this.readStream.resume();
  }

  _write(chunk, enc, cb) {
    this.writeStream.write(chunk, enc, cb);
  }
  _final(cb) {
    this.writeStream.end();
    cb();
  }
  _destroy(err, callback) {
    this.writeStream.destroy();
    this.readStream.destroy();
    callback(err);
  }
}

// const fd = new FileDuplex("stream.txt", "write.txt");

// fd.pipe(process.stdout);

class FileDuplex extends Duplex {
  constructor(inputFile, outputFile) {
    super({ encoding: "utf-8" });
    this.filePath;
    this.writeStream = fs.createWriteStream(outputFile, { flags: "a" });
    this.readStream = fs.createReadStream(inputFile, { encoding: "utf-8" });
    this.readStream.on("data", (chunk) => {
      if (!this.push(chunk)) {
        this.readStream.pause();
      }
    });
    this.readStream.on("end", () => this.push(null));

    this.readStream.on("error", (err) => {
      this.destroy(err);
    });
  }

  _read() {
    this.readStream.resume();
  }

  _write(chunk, enc, cb) {
    this.writeStream.write(chunk, enc, cb);
  }
  _final(cb) {
    this.writeStream.end();
    cb();
  }
  _destroy(err, callback) {
    this.writeStream.destroy();
    this.readStream.destroy();
    callback(err);
  }
}

class UpperCaseTranfom extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encoding, callback) {
    const upperCase = chunk.toString().toUpperCase();
    this.push(upperCase);
    callback();
  }
  _flush(callback) {
    callback();
  }
}

class ConsoleWritable extends Writable {
  _write(chunk, enc, cb) {
    process.stdout.write(chunk);
    cb();
  }
}
const ws = new ConsoleWritable();

ws.write("Hello\n");
ws.write("Hello\n");
ws.write("Hello\n");
ws.write("Hello\n");
ws.write("Hello\n");
ws.end("Hello\n");
const fd = new FileDuplex("stream.txt", "write.txt");

// fd.pipe(new UpperCaseTranfom()).pipe(process.stdout);

// pipeline(fd, new UpperCaseTranfom(), process.stdout, (err) => {
//   if (err) {
//     console.log("pipeline failed", err.message);
//   } else {
//     console.log("Pipline succed");
//   }
// });

pipeline(fd, new UpperCaseTranfom(), new ConsoleWritable(), (err) => {
  if (err) {
    console.log("pipeline failed:", err.message);
  } else {
    console.log("Pipeline succeeded");
  }
});
