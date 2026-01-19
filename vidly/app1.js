const http = require("http");
const { Readable, Transform, Duplex, Writable } = require("stream");

const SOURCE_URL = "https://norvig.com/big.txt";

/* =========================
   TRANSFORM STREAM
   (uppercase conversion)
========================= */
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString("utf8").toUpperCase();
    callback(null, Buffer.from(text));
  },
});

/* =========================
   DUPLEX STREAM
   (log + pass-through)
========================= */
const loggingDuplex = new Duplex({
  read() {
    // data is pushed from write()
  },

  write(chunk, encoding, callback) {
    console.log(`📦 Duplex passing ${chunk.length} bytes`);
    this.push(chunk); // forward data
    callback();
  },

  final(callback) {
    this.push(null);
    callback();
  },
});

/* =========================
   HTTP SERVER
========================= */
http
  .createServer(async (req, res) => {
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

      /* ---------- READABLE (Web → Node) ---------- */
      const readable = Readable.fromWeb(response.body);

      /* ---------- WRITABLE (HTTP response) ---------- */
      const writable = new Writable({
        write(chunk, encoding, callback) {
          res.write(chunk); // streaming write
          callback();
        },
        final(callback) {
          res.end(); // close response
          callback();
        },
      });

      /* ---------- PIPELINE ---------- */
      readable.pipe(upperCaseTransform).pipe(loggingDuplex).pipe(writable);
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }
  })
  .listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
