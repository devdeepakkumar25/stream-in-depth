/**
 * HTTP server with Writable stream + CORS support
 */

const http = require("http");
const { Writable } = require("stream");

const server = http.createServer((req, res) => {
  // 🔹 CORS HEADERS (for every request)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔹 Handle preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // 🔹 Handle POST request
  if (req.method === "POST" && req.url === "/write") {
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        const data = chunk.toString();
        console.log("Received chunk:", data);

        // Simulate async processing
        setTimeout(() => {
          console.log("Processed chunk");
          callback();
        }, 2000);
      },
    });

    // Pipe request body into writable stream
    req.pipe(writableStream);

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Data received successfully");
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/write");
});
