const { required } = require("joi");
const mongoose = require("mongoose");

const url = "mongodb://localhost/mongo-exercise";
async function coonectToMongoDb(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongo Db");
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error.message);
    process.exit(1);
  }
}

coonectToMongoDb(url);

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("courses", schema);

async function getCourse() {
  try {
    const courses = await Course.find();
    console.log(courses);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

// getCourse();

async function filterdCourse() {
  try {
    const courses = await Course.find({
      isPublished: true,
      tags: "backend",
    })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });

    console.log(courses);
    return courses;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

// filterdCourse();

async function filterCourse2() {
  try {
    const result = await Course.find({
      isPublished: true,
      //   tags: { $in: ["frontend", "backend"] },
    })
      .or([{ tags: "frontend" }, { tags: "backend" }])
      .sort("-price")
      .select({ name: 1, author: 1 });
    //   .sort({ price: -1 })
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// filterCourse2();

async function filterCourse3() {
  try {
    const result = await Course.find({
      isPublished: true,
    })
      .or([{ name: /.*by.*/gi }, { price: { $gt: 15 } }])
      .sort("-price");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

filterCourse3();
