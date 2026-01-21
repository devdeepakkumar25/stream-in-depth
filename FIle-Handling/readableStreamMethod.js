const { Readable, pipeline } = require("stream");
const fs = require("fs");

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

function run() {
  const fileStream = fs.createReadStream("stream.txt");

  const rs = new Readable({
    read() {},
  });

  fileStream.on("data", (chunk) => {
    const canPush = rs.push(chunk);
    if (!canPush) {
      fileStream.pause();
    }
  });

  fileStream.on("end", () => {
    rs.push(null);
  });

  rs.on("drain", () => {
    fileStream.resume();
  });

  rs.on("data", (chunk) => {
    console.log("[data]", chunk.toString());
  });
}

// run();

function run2() {
  const rs = new Readable({
    read() {},
  });

  setInterval(() => {
    rs.push("hello\n");
  }, 1000);

  function run() {
    rs.pipe(process.stdout);
  }

  run();
}

run2();

function run3() {
  let i = 0;

  const rs = new Readable({
    read() {
      if (i > 5) {
        this.push(null);
      } else {
        this.push(String(i++));
      }
    },
  });

  function run() {
    rs.pipe(process.stdout);
    rs.on("data", (chunk) => [console.log(chunk.toString())]);
  }

  run();
}

class FileReadable extends Readable {
  constructor() {
    super();
    this.i = 0;
  }

  _read() {
    if (this.i > 5) {
      this.push(null);
    } else {
      this.push(String(this.i++));
    }
  }
}

const rs = new FileReadable();

new FileReadable().pipe(process.stdout);
function run() {
  rs.pipe(process.stdout);
  rs.on("data", (chunk) => [console.log(chunk.toString())]);
}

run();

Readable.from(["Hello\n", "Hello\n", "End Hello\n"]).pipe(
  fs.createWriteStream("output.txt"),
);
