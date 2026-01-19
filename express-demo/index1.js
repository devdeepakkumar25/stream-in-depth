const config = require("config");
const express = require("express");
const Joi = require("joi");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

console.log(`app: ${app.get("env")}`);

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use(logger.log);
app.use(logger);

app.use(helmet());
// app.use(morgan("tiny"));
app.use("/api/courses", courses);
app.use("/", home);

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}

app.use(function (req, res, next) {
  console.log("Logging...");
  next();
});

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

/* -------------------------------
   PORT LISTEN
--------------------------------*/
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

// const express = require("express");
// const Joi = require("joi");

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json());

// const courses = [
//   { id: 1, name: "course1" },
//   { id: 2, name: "course2" },
//   { id: 3, name: "course3" },
// ];

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
// app.get("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(400).send("The course with given ID was not found");
//   res.send(course);
// });

// app.post("/api/courses", (req, res) => {
//   // if (!req.body.name || req.body.name.length < 3) {
//   //   return res
//   //     .status(400)
//   //     .send("Name is required and should be minimum 3 characters!");
//   // }

//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//   });

//   const result = schema.validate(req.body);
//   console.log(result);

//   if (result.error) {
//     // return res.status(400).send(result.error);
//     return res.status(400).send(result.error.details[0].message);
//   }
//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };
//   courses.push(course);
//   res.send(course);
// });

// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

// app.get("/api/posts/:year/:month", (req, res) => {
//   // res.send(req.params);
//   res.send(req.query);
// });

// app.get("/api/courses", (req, res) => {
//   res.send([1, 2, 3]);
// });

// app.put("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.body.id));
//   if (!course)
//     return res.status(400).send("The course with the given ID was not found");

//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//   });

//   const result = schema.validate(req.body);

//   if (result.error) {
//     return res.status(500).send(error.details[0].message);
//   }

//   course.name = req.body.name;

//   res.send(course);
// });

// app.delete("/api/course/:id", (req, res) => {
//   const course = courses((c) => c.id === parseInt(req.body.id));
//   if (!course)
//     return res.status(400).send("The course with given id was not found!");

//   const index = courses.indexOf(course);

//   courses.splice(index, 1);
//   res.send(course);
// });

// app.listen(port, () =>
//   console.log(`Listening on port http://localhost:${port}`)
// );

// function validateCourse(course) {
//   const schema = Joi.object({
//     name: Joi.string().min().required(),
//   });

//   return schema.validate(course);
// }
