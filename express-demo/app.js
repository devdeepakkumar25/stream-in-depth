const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

// app.get();

// app.post();

// app.put();

// app.delete();

// app.get(path or url ,callback function  )

const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    // res.status(400).send(result.error);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Loop up the course
  // if not existing ,return 404
  // validate ,return 400 -Bad request
  // update course
  // Return the updated course

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The Course with the given ID was not found");
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  //   const result = schema.validate(req.body);
  //   console.log(result);

  //   const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //   }

  if (error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // Not existing ,return 404
  // Delete
  //  Return the same course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send(course);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/coursesa", (req, res) => {
  res.send([1, 2, 3]);
});
app.get("/api/coursesa/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts1/:year/:month", (req, res) => {
  res.send(req.params);
  //   res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
