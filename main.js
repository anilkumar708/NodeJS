const Logger = require("./starter");
const logger = new Logger();

//Register a listener
logger.on("first event stream", (eventArg) => {
  console.log("First event message", eventArg);
});
logger.log("anil");
