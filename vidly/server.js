const http = require("http");
const { Readable, Transform, Writable, Duplex } = require("stream");

const SOURCE_URL = "https://norvig.com/big.txt";

/* =========================
   TRANSFORM STREAM
   (lowercase → uppercase)
========================= */
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString("utf8").toUpperCase();
    callback(null, Buffer.from(text));
  },
});

/* =========================
   DUPLEX STREAM
   (pass-through + logging)
========================= */
class LoggingDuplex extends Duplex {
  _read(size) {
    // reading is handled by pushed data
  }

  _write(chunk, encoding, callback) {
    console.log(`📦 Duplex received ${chunk.length} bytes`);
    this.push(chunk); // pass data forward
    callback();
  }

  _final(callback) {
    this.push(null);
    callback();
  }
}

/* =========================
   HTTP SERVER
========================= */
const server = http.createServer(async (req, res) => {
  if (req.url !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not Found");
  }

  try {
    const response = await fetch(SOURCE_URL);

    /* ---------- HEADERS ---------- */
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    });

    /* ---------- STREAM PIPELINE ---------- */
    const readable = Readable.fromWeb(response.body); // Web → Node
    const duplex = new LoggingDuplex();

    const writable = new Writable({
      write(chunk, encoding, callback) {
        res.write(chunk);
        callback();
      },
      final(callback) {
        res.end();
        callback();
      },
    });

    readable.pipe(upperCaseTransform).pipe(duplex).pipe(writable);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

/* =========================
   START SERVER
========================= */
server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
