const http = require("http");
const { Readable, Transform, Writable, pipeline } = require("stream");
const zlib = require("zlib");

const SOURCE_URL = "https://norvig.com/big.txt";

http
  .createServer(async (req, res) => {
    if (req.url !== "/") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not Found");
    }

    /* =========================
     ABORT / CANCEL SUPPORT
  ========================= */
    const abortController = new AbortController();
    const { signal } = abortController;

    req.on("close", () => {
      console.log("❌ Client disconnected – aborting fetch");
      abortController.abort();
    });

    try {
      const response = await fetch(SOURCE_URL, { signal });

      /* =========================
       HEADERS
    ========================= */
      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Encoding": "gzip",
        "Transfer-Encoding": "chunked",
      });

      /* =========================
       WORD COUNT TRANSFORM
    ========================= */
      let wordCount = 0;
      let leftover = "";

      const wordCountTransform = new Transform({
        transform(chunk, encoding, callback) {
          const text = leftover + chunk.toString("utf8");
          const words = text.split(/\s+/);

          leftover = words.pop(); // save incomplete word
          wordCount += words.filter(Boolean).length;

          callback(null, Buffer.from(text));
        },
        flush(callback) {
          if (leftover.trim()) wordCount++;
          console.log("📊 Total Words:", wordCount);
          callback();
        },
      });

      /* =========================
       GZIP TRANSFORM
    ========================= */
      const gzip = zlib.createGzip();

      /* =========================
       WRITABLE (HTTP RESPONSE)
    ========================= */
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

      /* =========================
       PIPELINE (SAFE STREAMING)
    ========================= */
      pipeline(
        Readable.fromWeb(response.body), // Web → Node
        wordCountTransform,
        gzip,
        writable,
        (err) => {
          if (err) {
            if (err.name === "AbortError") {
              console.log("⚠️ Streaming aborted");
            } else {
              console.error("Stream error:", err);
            }
            res.destroy();
          }
        }
      );
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }
  })
  .listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
  });
