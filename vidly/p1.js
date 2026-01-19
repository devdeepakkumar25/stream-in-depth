const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from project 1");
});

server.on("request", (req, res) => {
  console.log("Request received: ", req.url);
});

server.once("listening", () => {
  console.log("Server started for the first time");
});
server.addListener("close", () => {
  console.log("Server is closing");
});

server.on("customEvent", (msg) => {
  console.log("Custom Event Fired: ", msg);
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
  console.log("Is listening ? :", server.listening);
  ("");

  server.emit("customEvent", "Hello from emit()");
});

setTimeout(() => {
  console.log("Registered events: ", server.eventNames());
}, 2000);

const intervalId = setInterval(() => {
  console.log("Server heartbeat...");
}, 2000);

setTimeout(() => {
  clearInterval(intervalId);
  server.close();
}, 8000);

const immediateId = setImmediate(() => {
  console.log("setImmediate executed");
});

setTimeout(() => {
  console.log("Clearing the setImmediate");
  clearImmediate(immediateId);
}, 7000);
