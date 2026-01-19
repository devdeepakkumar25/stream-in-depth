const expres = require("express");
const router = expres.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.status(200).send(courses);
});




router.get("/:id", (req, res) => {
  //   res.write("api");
  //   res.write(req.params.id);
  //   res.end();
  //   res.send("Hello");
  //   res.send(req.params.id);

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  console.log(course);
  if (!course)
    return res.status(404).send("The course with given id was not found");
  res.status(200).send(course);
});



router.post("/", (req, res) => {
  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });
  //   const { error } = schema.validate(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //   if (!req.body.name || req.body.name.length < 3) {
  //     return res
  //       .status(400)
  //       .send("Name is required and should be minimum length 3");
  //   }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});



router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("Course with given id was not foun!");

  //   const schema = Joi.object({
  //     name: Joi.string().min(3).required(),
  //   });

  //   const { error } = schema.validate(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  course.name = req.body.name;
  res.status(200).send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Couse with given id was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.status(404).send(course);
});


// router.get("/api/posts/:year/:month", (req, res) => {
//   //   res.send(req.params.year);
//   //   res.send(req.params);
//   res.send(req.query);
// });

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
