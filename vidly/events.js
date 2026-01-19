// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// // Register a listener

// emitter.on("messageLogged", function () {
//   console.log("Listener called");
// });

// // Raise an Event
// emitter.emit("messageLogged");

// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// emitter.on("messageLogged", function (arg) {
//   console.log("Listener called", arg);
// });

// emitter.emit("messageLogged", { id: 1, url: "http://" });

const Logger = require("./logEvents");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Lisstener is called for the Logger Module with message: ", arg);
});

logger.log({ id: 1, url: "https://google.com" });
