/**
 * Node.js server using Transform stream
 * Reads data from fetch(), transforms it, and writes output
 */

const http = require("http");
const { Transform, Writable } = require("stream");

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/transform") {
    // 🔄 Transform stream: modifies incoming data
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const output = input.toUpperCase(); // transformation

        console.log("Input:", input);
        console.log("Transformed:", output);

        callback(null, output);
      },
    });

    // 🧾 Writable stream: final destination
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        console.log("Written:", chunk.toString());
        callback();
      },
    });

    // 🔗 Pipeline
    req.pipe(transformStream).pipe(writableStream);

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Data transformed successfully");
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/transform");
});
