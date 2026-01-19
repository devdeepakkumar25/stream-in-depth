const fs = require("fs");
const { Transform } = require("stream");

function convertToUpperCase() {
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const upper = chunk.toString().toUpperCase();
      const letters = upper.match(/[a-zA-Z]/g);
      const text = letters ? letters.join(" ") : "";
      console.log(text);

      callback(null, text);
    },
  });

  fs.createReadStream("stream.txt")
    .pipe(upperCaseTransform)
    .pipe(fs.createWriteStream("output.txt"));

  console.log("Transform to uppercase");
}

// convertToUpperCase();

function toUpperCaseGetLetters() {
  const upperCaseTransform = new Transform({
    readableHighWaterMark: 16 * 1024,
    writableHighWaterMark: 16 * 1024,

    transform(chunk, encoding, callback) {
      this.buffer = (this.buffer || "") + chunk.toString();
      const lines = this.buffer.split("\n");
      this.buffer = lines.pop();

      for (const line of lines) {
        const letters = line.toUpperCase().match(/[A-Z]/g);
        this.push(letters ? letters.join("") + "\n" : "\n");
      }

      callback();
    },

    flush(callback) {
      if (this.buffer) {
        const letters = this.buffer.toUpperCase().match(/[A-Z]/g);
        this.push(letters ? letters.join(" ") : "");
      }
      callback();
    },
  });
  fs.createReadStream("stream.txt")
    .pipe(upperCaseTransform)
    .pipe(fs.createWriteStream("output.txt"));

  console.log("Transform to uppercase");
}

// toUpperCaseGetLetters();

function toUpperCaseGetLettersMethod() {
  const upperCaseTransform = new Transform({
    readableHighWaterMark: 16 * 1024,
    writableHighWaterMark: 16 * 1024,

    transform(chunk, encoding, callback) {
      this.buffer = (this.buffer || "") + chunk.toString();
      const lines = this.buffer.split("\n");
      this.buffer = lines.pop();

      for (const line of lines) {
        const letters = line.toUpperCase().match(/[A-Z]/g);
        this.push(letters ? letters.join("") + "\n" : "\n");
      }

      callback();
    },

    flush(callback) {
      if (this.buffer) {
        const letters = this.buffer.toUpperCase().match(/[A-Z]/g);
        this.push(letters ? letters.join("") : "");
      }
      callback();
    },
  });

  // 🔹 READABLE SIDE EVENTS
  upperCaseTransform.on("data", (chunk) => {
    console.log("[data] chunk emitted:", chunk.toString());
  });

  upperCaseTransform.on("end", () => {
    console.log("[end] readable side ended");
  });

  // 🔹 WRITABLE SIDE EVENTS
  upperCaseTransform.on("finish", () => {
    console.log("[finish] writable side finished");
  });

  upperCaseTransform.on("drain", () => {
    console.log("[drain] backpressure relieved");
  });

  // 🔹 LIFECYCLE EVENTS
  upperCaseTransform.on("close", () => {
    console.log("[close] stream closed");
  });

  upperCaseTransform.on("error", (err) => {
    console.error("[error]", err.message);
  });

  // 🔹 PIPELINE
  fs.createReadStream("stream.txt")
    .pipe(upperCaseTransform)
    .pipe(fs.createWriteStream("output.txt"));

  console.log("Transform to uppercase");
}

// toUpperCaseGetLettersMethod();

class UpperCaseLettersTransform extends Transform {
  constructor(options = {}) {
    super({
      readableHighWaterMark: 16 * 1024,
      writableHighWaterMark: 16 * 1024,
      ...options,
    });

    // 📦 custom internal state
    this.buffer = "";
  }

  // 🔹 REQUIRED METHOD
  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();

    const lines = this.buffer.split("\n");
    this.buffer = lines.pop();

    for (const line of lines) {
      const letters = line.toUpperCase().match(/[A-Z]/g);
      this.push(letters ? letters.join("") + "\n" : "\n");
    }

    callback(); // must be called
  }

  // 🔹 OPTIONAL BUT IMPORTANT
  _flush(callback) {
    if (this.buffer) {
      const letters = this.buffer.toUpperCase().match(/[A-Z]/g);
      this.push(letters ? letters.join("") : "");
    }
    callback();
  }
}

function toUpperCaseGetLettersClassMethod() {
  const transform = new UpperCaseLettersTransform();

  // 🎧 LISTENERS (Readable side)
  transform.on("data", (chunk) => {
    console.log("[data]", chunk.toString());
  });

  transform.on("end", () => {
    console.log("[end] readable side ended");
  });

  // 🎧 LISTENERS (Writable side)
  transform.on("finish", () => {
    console.log("[finish] writable side finished");
  });

  transform.on("drain", () => {
    console.log("[drain] backpressure relieved");
  });

  // 🎧 LIFECYCLE
  transform.on("close", () => {
    console.log("[close] stream closed");
  });

  transform.on("error", (err) => {
    console.error("[error]", err.message);
  });

  fs.createReadStream("stream.txt")
    .pipe(transform)
    .pipe(fs.createWriteStream("output.txt"));
}

function toUpperCaseGetLetters() {
  const transform = new UpperCaseLettersTransform();

  // 🎧 LISTENERS (Readable side)
  transform.on("data", (chunk) => {
    console.log("[data]", chunk.toString());
  });

  transform.on("end", () => {
    console.log("[end] readable side ended");
  });

  // 🎧 LISTENERS (Writable side)
  transform.on("finish", () => {
    console.log("[finish] writable side finished");
  });

  transform.on("drain", () => {
    console.log("[drain] backpressure relieved");
  });

  // 🎧 LIFECYCLE
  transform.on("close", () => {
    console.log("[close] stream closed");
  });

  transform.on("error", (err) => {
    console.error("[error]", err.message);
  });

  fs.createReadStream("stream.txt")
    .pipe(transform)
    .pipe(fs.createWriteStream("output.txt"));
}

toUpperCaseGetLetters();
