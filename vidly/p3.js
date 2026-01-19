const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hello from project 3");
});

// Track sockets
const sockets = new Set();

server.on("connection", (socket) => {
  console.log("Socket: ", socket);
  sockets.add(socket);

  socket.on("close", () => {
    sockets.delete(socket);
  });
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

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Monitor
const monitor = setInterval(() => {
  console.log("Server listening:", server.listening);
}, 3000);

// 🔥 IMPORTANT: run shutdown only once
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

  // 🔥 Force close existing connections
  sockets.forEach((socket) => {
    socket.destroy();
  });

  // 🔥 Safety exit (if something hangs)
  setTimeout(() => {
    console.log("Forcing shutdown");
    process.exit(1);
  }, 5000);
}

// Use once, not on
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
