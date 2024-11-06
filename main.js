const Joi = require("joi");
const Logger = require("./starter");
const express = require("express");
const logger = new Logger();
const app = express();

const courses = [
  { id: 1, name: "node", trainer: "mosh" },
  { id: 2, name: "react", trainer: "anil" },
  { id: 3, name: "angular", trainer: "reddy" },
];

const port = process.env.port || 3000;
app.use(express.json());

//Register a listener
logger.on("first event stream", (eventArg) => {
  console.log("First event message", eventArg);
});
logger.log("anil");

app.get("/", (req, res) => {
  res.send("Hello Anil");
});

app.get("/api/course", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  const data = courses.find((c) => c.id === parseInt(req.params.id));
  if (!data) return res.status(404).send("Given data name not found");

  res.status(200).send(data);
});

app.post("/api/course", (req, res) => {
  const { error } = validationError(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    trainer: req.body.trainer,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/course/:id", (req, res) => {
  //look up the course
  const data = courses.find((c) => c.id === parseInt(req.params.id));
  //if not exist return to 404
  if (!data) return res.status(404).send("Given data name not found");

  //validate
  const { error } = validationError(req.body);
  //if invalid, return to 400 - bad request
  if (error) return res.status(400).send(error.details[0].message);

  //update the course
  data.name = req.body.name;
  data.trainer = req.body.trainer;
  //return the updated course to client
  res.send(data);
});

app.delete("/api/course/:id", (req, res) => {
  //look up the course
  const data = courses.find((c) => c.id === parseInt(req.params.id));
  //if not exist return to 404
  if (!data) return res.status(404).send("Given data name not found");

  const index = courses.indexOf(data);
  courses.splice(index, 1);
  res.send(data);
});

function validationError(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    trainer: Joi.string().min(5).required(),
  });
  return schema.validate(course);
}

app.listen(port, () => console.log(`App listening on ${port}...`));
