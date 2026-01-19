// const http = require("http");

// let count = 0;
// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("Reaquest received", ++count);
//   console.log("Request method", req.method);
//   console.log("Request url", req.url);

//   res.end(`Request received ${count}`);
// });

// server.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });

const EvetEmitter = require("events");
const { EventEmitter } = require("stream");
const http = require("http");

// const myEmmiter = new EvetEmitter();
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmmiter = new Sales();
myEmmiter.on("newSale", () => {
  console.log("The was new sale");
});
myEmmiter.on("newSale", () => {
  console.log("Customer name: jonas");
});

myEmmiter.on("newSale", (stock) => {
  console.log(stock);
});
myEmmiter.emit("newSale", 9);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  //   res.end("Request received");
});

server.on("request", (req, res) => {
  if (!req.writableEnded) {
    res.end("ANother request");
  }
});

server.on("close", () => {
  console.log("Server closed");
});

server.on("error", () => {
  console.log("Error");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("waiting for requests...");
});
