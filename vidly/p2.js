const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hello from project 2");
});

server.on("request", (req) => {
  console.log(`Request: ${req.method} ${req.url}`);
});

server.on("listening", () => {
  console.log("Server is up");
});

server.on("close", () => {
  console.log("Server closed gracefully");
});

// server.on("request", onRequest);
// server.off("request", onRequest);
// function onRequest(req, res) {
//   console.log("Request received");
// }

server.listen(3000, () => {
  console.log("server is running on port 3000");
});

const monitor = setInterval(() => {
  console.log("Server listening: ", server.listening);
}, 3000);

// function shutdown() {
//   console.log("Shutdown signal received");
//   clearInterval(monitor);

//   server.close(() => {
//     console.log("All connections closed");
//     process.exit(0);
//   });
// }

// process.on("SIGINT", shutdown);

let isShuttingDown = false;

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("\nShutdown signal received");
  clearInterval(monitor);

  // Stop accepting new connections
  server.close(() => {
    console.log("All connections closed");
    process.exit(0);
  });
}

process.stdout.write("Hwllo from the process");
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
