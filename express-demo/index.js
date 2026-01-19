const express = require("express");
const Joi = require("joi");
const rev = require("./routes/rev");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/course", rev);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("The course with given ID was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  // if (!req.body.name || req.body.name.length < 3) {
  //   return res
  //     .status(400)
  //     .send("Name is required and should be minimum 3 characters!");
  // }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    // return res.status(400).send(result.error);
    return res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.body.id));
  if (!course)
    return res.status(400).send("The course with the given ID was not found");

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(500).send(error.details[0].message);
  }

  course.name = req.body.name;

  res.send(course);
});

app.delete("/api/course/:id", (req, res) => {
  const course = courses((c) => c.id === parseInt(req.body.id));
  if (!course)
    return res.status(400).send("The course with given id was not found!");

  const index = courses.indexOf(course);

  courses.splice(index, 1);
  res.send(course);
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min().required(),
  });

  return schema.validate(course);
}
