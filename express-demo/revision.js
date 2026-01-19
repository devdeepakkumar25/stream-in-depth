const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/api/courses", (req, res) => {
  res.status(200).send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(400).send("The course with given id was not found");
  }

  res.status(200).send(course);
});

app.post("/api/courses", (req, res) => {
  // if (req.body.name.length < 3)
  //   return res
  //     .status(400)
  //     .send("the course should have minimum of 3 character");

  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  // });

  // const { error } = schema.validate(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.status(201).send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(400).send("Course with given id was not found!");

  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }
  course.name = req.body.name;
  return res.status(200).send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("course with given id was not found!");

  const index = courses.indexOf(course, 1);
  courses.splice(index, 1);
  res.status(200).send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
