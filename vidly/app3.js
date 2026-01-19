const http = require("http");
const { Readable, Transform, Writable, pipeline } = require("stream");
const zlib = require("zlib");

const SOURCE_URL = "https://norvig.com/big.txt";

http.createServer(async (req, res) => {
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
    console.log("❌ Client disconnected – aborting");
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
       LINE-BY-LINE TRANSFORM
    ========================= */
    let lineBuffer = "";

    const lineTransform = new Transform({
      transform(chunk, encoding, callback) {
        lineBuffer += chunk.toString("utf8");

        const lines = lineBuffer.split("\n");
        lineBuffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          this.push(line + "\n");
        }

        callback();
      },
      flush(callback) {
        if (lineBuffer) {
          this.push(lineBuffer + "\n");
        }
        callback();
      }
    });

    /* =========================
       WORD COUNT TRANSFORM
    ========================= */
    let wordCount = 0;

    const wordCountTransform = new Transform({
      transform(chunk, encoding, callback) {
        const text = chunk.toString("utf8");
        const words = text.match(/\b\w+\b/g);
        if (words) wordCount += words.length;

        callback(null, chunk); // pass data through unchanged
      },
      flush(callback) {
        console.log("📊 TOTAL WORD COUNT:", wordCount);
        callback();
      }
    });

    /* =========================
       GZIP STREAM
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
      }
    });

    /* =========================
       PIPELINE
    ========================= */
    pipeline(
      Readable.fromWeb(response.body),
      lineTransform,
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
    if (err.name === "AbortError") return;

    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }

}).listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});


