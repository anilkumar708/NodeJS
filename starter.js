const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(name) {
    console.log("Hello" + name);
    // Raise an event
    this.emit("first event stream", { name: "anil", age: 29, loc: "chennai" });
  }
}
module.exports = Logger;
