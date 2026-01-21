const fs = require("fs");
const { Writable } = require("stream");

function writeUsingFactory() {
  const ws = fs.createWriteStream("output.txt");

  ws.on("finish", () => console.log("[finish] done"));
  ws.on("close", () => console.log("[close] closed"));
  ws.on("error", console.error);

  ws.write("Hello\n");
  ws.write("World\n");
  ws.end();
}

// writeUsingFactory();

function writeUsingNewWritable() {
  const ws = new Writable({
    write(chunk, encoding, callback) {
      console.log("[write]", chunk.toString());
      callback();
    },
  });

  //   attachWritableListeners(ws);

  ws.write("Hello\n");
  ws.write("World\n");
  ws.end();
}

// writeUsingNewWritable();

class FileWritable extends Writable {
  constructor(filePath, options = {}) {
    super(options);
    this.fd = fs.openSync(filePath, "w");
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _final(callback) {
    fs.close(this.fd, callback);
  }
}

function writeUsingClass() {
  const ws = new FileWritable("output.txt");

  attachWritableListeners(ws);

  ws.write("Line 1\n");
  ws.write("Line 2\n");
  ws.end("Line 3\n");
}

// writeUsingClass();

function attachWritableListeners(ws) {
  ws.on("finish", () => {
    console.log("[finish] writable finished");
  });

  ws.on("drain", () => {
    console.log("[drain] backpressure relieved");
  });

  ws.on("close", () => {
    console.log("[close] writable closed");
  });

  ws.on("pipe", () => {
    console.log("[pipe] source piped in");
  });

  ws.on("unpipe", () => {
    console.log("[unpipe] source unpiped");
  });

  ws.on("error", (err) => {
    console.error("[error]", err.message);
  });
}

class ThrottledFileWriter extends Writable {
  constructor(file, options = {}) {
    super(options);
    this.fd = fs.openSync(file, "w");
  }

  _write(chunk, encoding, callback) {
    setTimeout(() => {
      fs.write(this.fd, chunk, callback);
    }, 200); // simulate slow disk
  }

  _final(callback) {
    fs.close(this.fd, callback);
  }
}

function writeUsingClass() {
  const writer = new ThrottledFileWriter("stream.txt", {
    highWaterMark: 64,
  });

  let i = 0;
  const MAX = 15;

  function writeMore() {
    let canWrite = true;

    while (i < MAX && canWrite) {
      canWrite = writer.write(`Chunk ${i}\n`);
      console.log("Writing", i);
      i++;
    }

    if (i >= MAX) {
      writer.end("Last Chunk\n");
      return;
    }

    writer.once("drain", () => {
      console.log("[drain] continue writing");
      writeMore();
    });
  }

  writer.on("finish", () => console.log("[finish] completed"));
  writer.on("error", console.error);

  writeMore();
}

writeUsingClass();

function run() {
  const stream = fs.createWriteStream("ab.txt", { flags: "a" });

  const ws = new Writable({
    write(chunk, encoding, callback) {
      stream.write(chunk, encoding, callback);
      console.log("[write]]", chunk.toString());
    },
    final(callback) {
      stream.end();
      callback();
    },
  });

  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.write("Hello \n");
  ws.end("End Hello\n");
}

class FileWritable extends Writable {
  constructor() {
    super();
    this.stream = fs.createWriteStream("ab.txt", { flags: "a" });
  }
  _write(chunk, encoding, callback) {
    this.stream.write(chunk, encoding, callback);
    console.log("[write]]", chunk.toString());
  }

  _final(callback) {
    this.stream.end();
    callback();
  }
}

const ws = new FileWritable();
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.write("Hello \n");
ws.end("End Hello\n");
