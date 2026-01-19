const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genres");

router.get("/", async (req, res) => {
  const genre = await Genre.find().sort("name");
  res.status(200).send(genre);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid genre id");

  const genre = await Genre.findById(id);

  if (!genre) return res.status(404).send("Genre with given id was not found");
  res.status(200).send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  try {
    genre = await genre.save();
    res.status(201).send(genre);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid genre id");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!genre)
      return res.status(404).send("Genre with given id was not found");
    res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("invalid genre id");

  const genre = await Genre.findByIdAndDelete(id);

  if (!genre) return res.status(404).send("Genre with given id was not found");

  res.status(200).send(genre);
});

module.exports = router;
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router();
// const Joi = require("joi");

// const schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50,
//   },
// });

// const Genre = mongoose.model("Genre", schema);

// router.get("/", async (req, res) => {
//   const genres = await Genre.find().sort("name");

//   res.status(200).send(genres);
// });

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(req.params.id))
//     return res.status(400).send("Object not found for the given id");
//   const genre = Genre.findById(id);
//   res.status(200).send(genre);
// });

// router.post("/", async (req, res) => {
//   const { error } = validateGenre(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let genre = new Genre({
//     name: req.body.name,
//   });
//   try {
//     genre = await genre.save();
//     res.status(201).send(genre);
//   } catch (err) {
//     res.status(400).send(JSON.stringify({ message: err.message }));
//   }
// });

// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("Genre with given id was not found");

//   let genre = await Genre.findById(id);
//   if (!genre) return res.status(400).send("Genre is not found");
//   const { error } = validateGenre(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//     genre.name = req.body.name;

//     genre = await genre.save();
//     res.status(200).send(genre);
//   } catch (error) {
//     res.status(400).send(JSON.stringify({ message: err.message }));
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).send("The id was not valid");

//   let genre = await Genre.findById(id);

//   if (!genre) return res.status(404).send("Genre with given id was not found");

//   try {
//     await genre.deleteOne();
//     res.status(404).send(genre);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// function validateGenre(genre) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//   });

//   return schema.validate(genre);
// }

// module.exports = router;
