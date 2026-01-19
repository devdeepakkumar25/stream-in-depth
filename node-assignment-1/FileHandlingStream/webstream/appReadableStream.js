/**
 * Simple HTTP streaming server using Node.js Readable stream
 */

const http = require("http");
const { Readable } = require("stream");

const server = http.createServer((req, res) => {
  // Handle streaming endpoint
  if (req.method === "GET" && req.url === "/stream") {
    // Data to be streamed chunk by chunk
    const words = [
      "Hello ",
      "subscribers ",
      "welcome ",
      "to ",
      "my Web Development course",
    ];

    let index = 0;

    // Create a custom Readable stream
    const readableStream = new Readable({
      read() {
        // If data is still available, push next chunk
        if (index < words.length) {
          const chunk = words[index++];

          // Simulate delay (like real streaming data)
          setTimeout(() => {
            this.push(chunk);
          }, 2000);
        } else {
          // No more data → end the stream
          this.push(null);
        }
      },
    });

    // HTTP headers for streaming response
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Access-Control-Allow-Origin": "*",
    });

    // Pipe readable stream to HTTP response
    readableStream.pipe(res);
  } else {
    // Fallback for unknown routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(3000, "localhost", () => {
  console.log("Server running at http://localhost:3000/stream");
});
