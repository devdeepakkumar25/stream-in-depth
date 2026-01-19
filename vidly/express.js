const config = require("config");
const express = require("express");
const logger = require("./middleware");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/genres");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
// app.use(courses);
app.use(home);
app.use("/api/courses", courses);
app.use("/api/genres", genres);

// Configuration
// export NODE_ENV=development
// export app_password=1234

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail_password: " + config.get("mail.password"));
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled");
}
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

app.set("view engine", "pug");
app.set("views", "./views"); //default

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
