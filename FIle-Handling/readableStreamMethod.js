const fs = require("fs");
const { Readable } = require("stream");

function readUsingFactory() {
  const rs = fs.createReadStream("stream.txt", {
    highWaterMark: 16 * 1024,
    encoding: "utf8",
  });

  attachListeners(rs);
}

function attachListeners(rs) {
  rs.on("data", (chunk) => {
    console.log("[data]", chunk.toString());
  });

  //   rs.on("readable", () => {
  //     // console.log("[readable] stream is readable");
  //     let chunk;
  //     while ((chunk = rs.read()) !== null) {
  //       console.log("[data]", chunk.toString());
  //     }
  //   });

  rs.on("end", () => {
    console.log("[end] no more data");
  });

  rs.on("pause", () => {
    console.log("[pause]");
  });

  rs.on("resume", () => {
    console.log("[resume]");
  });

  rs.on("close", () => {
    console.log("[close] stream closed");
  });

  rs.on("error", (err) => {
    console.error("[error]", err.message);
  });
}

// readUsingFactory();

function readUsingNewReadable() {
  const fd = fs.openSync("stream.txt", "r");
  const bufferSize = 32;

  const rs = new Readable({
    read() {
      const buffer = Buffer.alloc(bufferSize);
      const bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null);

      if (buffer.length !== 0) {
        console.log("Data: ", buffer.toString("utf8"));
      }

      if (bytesRead === 0) {
        fs.closeSync(fd);
        this.push(null);
      } else {
        this.push(buffer.slice(0, bytesRead));
      }
    },
  });

  attachListeners(rs);
}

// readUsingNewReadable();

class FileReadable extends Readable {
  constructor(filePath, options = {}) {
    super(options);
    this.fd = fs.openSync(filePath, "r");
    this.bufferSize = 32;
  }

  _read() {
    const buffer = Buffer.alloc(this.bufferSize);
    const bytesRead = fs.readSync(this.fd, buffer, 0, this.bufferSize, null);

    if (bytesRead === 0) {
      fs.closeSync(this.fd);
      this.push(null);
    } else {
      this.push(buffer.slice(0, bytesRead));
    }
  }
}

function readUsingClass() {
  const rs = new FileReadable("stream.txt", {
    encoding: "utf8",
  });

  //   rs.read();
  //   rs.on("data", (chunk) => {
  //     console.log("Chunk: ", chunk);
  //   });
  attachListeners(rs);
}

// readUsingClass();

class FileReadableClass extends Readable {
  constructor(filePath, options = {}) {
    super(options);
    this.fd = fs.openSync(filePath, "r");
    this.bufferSize = 32;
  }

  _read() {
    const buffer = Buffer.alloc(this.bufferSize);
    const bytesRead = fs.readSync(this.fd, buffer, 0, this.bufferSize, null);

    if (bytesRead === 0) {
      fs.closeSync(this.fd);
      this.push(null);
    } else {
      this.push(buffer.slice(0, bytesRead));
    }
  }
}

function readUsingClass() {
  const rs = new FileReadableClass("stream.txt", {
    encoding: "utf8",
  });

  attachListeners(rs);
}

readUsingClass();
