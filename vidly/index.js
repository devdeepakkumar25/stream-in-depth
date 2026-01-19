const mongoose = require("mongoose");
const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const app = express();
const url = "mongodb://localhost/vidly_fresh";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: ", err.message));

app.use(express.json());
app.use("/api/genres", genres);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
