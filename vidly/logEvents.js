const EventEmitter = require("events");

const emitter = new EventEmitter();

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", message);
  }
}
module.exports = Logger;

// function log(message) {
//     console.log(message);

//     emitter.emit("messageLogged", message);
//   }
