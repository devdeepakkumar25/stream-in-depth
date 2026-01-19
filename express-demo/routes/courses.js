const express = require("express");
const router = express.Router();

// In-memory database
const courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
];

/* -------------------------------
   GET REQUESTS
--------------------------------*/

// Get all courses
router.get("/", (req, res) => {
  res.send(courses);
});

// Get a specific course
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send("Course with given ID not found");
  }

  res.send(course);
});

/* -------------------------------
   POST REQUEST
--------------------------------*/

// Create a new course
router.post("/", (req, res) => {
  // Validate input
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Create new course
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

/* -------------------------------
   PUT REQUEST
--------------------------------*/

// Update a course
router.put("/:id", (req, res) => {
  // Step 1: Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Course with given ID not found");
  }

  // Step 2: Validate input
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Step 3: Update
  course.name = req.body.name;

  // Step 4: Return updated course
  res.send(course);
});

/* -------------------------------
   DELETE REQUEST
--------------------------------*/

// Delete a course
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Course with given ID not found");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

/* -------------------------------
   EXTRA ROUTES FOR LEARNING
--------------------------------*/

// Home route
// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

// Query parameters example
router.get("/:year/:month", (req, res) => {
  res.send(req.query); // ?sortBy=name
});

/* -------------------------------
   VALIDATION FUNCTION
--------------------------------*/
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

module.exports = router;
