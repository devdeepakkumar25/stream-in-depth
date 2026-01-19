const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/populationdb";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Connecte to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB: ", err.message));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
});

const Author = mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: authorSchema,
});

const Course = mongoose.model("Course", courseSchema);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log("Author created: ", result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log("Course created: ", result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate({
      path: "author",
      select: { name: 1, _id: 0 },
      options: { sort: { name: 1 } },
    })
    .select({ name: 1, author: 1, _id: 0 });

  console.log("Course with populated authors");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "https://example.com");

// const authorId = "6969e34c860ba4a7c480ebc5";

// createCourse(
//   "Node Course",
//   new Author({ name: "Mosh", bio: "My Bio", website: "https://exp.com" })
// );

// listCourses();

const courseId = "6969e3eb5ae49df8aa1377ed";

async function updateCourseAuthor(courseId) {
  //   const course = await Course.findById(courseId);
  //   course.author.name = "Deepak Kumar";
  //   course.save();
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Deepak Kumar Dev",
      },
    }
  );
  console.log(course);
}

async function updateCourseAuthorRemoveProperty(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        "author.name": "",
      },
    }
  );

  console.log(course);
}

updateCourseAuthor(courseId);

// updateCourseAuthorRemoveProperty(courseId);
